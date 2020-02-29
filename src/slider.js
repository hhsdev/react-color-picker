import React, { useRef, useState, useEffect, useCallback } from "react";
import Thumb from "./thumb";
import { createUseStyles } from "react-jss";

const sliderSyles = {
  slider: {
    position: "relative",
    width: "255px",
    height: "8px",
    borderRadius: "8px",
    backgroundSize: "contain",
    background:
      'rgba(0, 0, 0, 0) url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/\
9hAAAAHUlEQVQ4jWNgYGAQIYAJglEDhoUBg9+\
FowbQ2gAARjwKARjtnN8AAAAASUVORK5CYII=")',
    "&:focus": {
      outline: "none"
    },
    "&::before": {
      display: "inline-block",
      position: "absolute",
      top: 0,
      left: 0,
      width: "255px",
      height: "8px",
      borderRadius: "8px",
      background: props =>
        `linear-gradient(to right, ${props.from}, ${props.to})`,
      content: '""' // must use this for div to show up
    }
  }
};

const useSliderStyles = createUseStyles(sliderSyles);

export default function Slider(props) {
  let classes = useSliderStyles(props);
  const myRef = useRef();

  const { callback } = props;
  const [thumbPosition, setThumbPosition] = useState(props.value);
  const touchId = useRef();

  const trackFinger = (event, touchId) => {
    if (touchId.current !== undefined && event.changedTouches) {
      for (let i = 0; i < event.changedTouches.length; i += 1) {
        const touch = event.changedTouches[i];
        if (touch.identifier === touchId.current) {
          return {
            x: touch.clientX,
            y: touch.clientY
          };
        }
      }
      return false;
    }
    return {
      x: event.clientX,
      y: event.clientY
    };
  };

  const handleTouchStart = event => {
    event.preventDefault();

    const touch = event.changedTouches[0];
    if (touch != null) {
      touchId.current = touch.identifier;
    }

    const finger = trackFinger(event, touchId);
    changeValue(finger.x);

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = event => {
    const finger = trackFinger(event, touchId);
    if (!finger) return;
    changeValue(finger.x);
  };

  const handleTouchEnd = useCallback(event => {
    const finger = trackFinger(event, touchId);

    if (!finger) return;

    touchId.current = undefined;

    document.removeEventListener("mousemove", handleTouchMove);
    document.removeEventListener("mouseup", handleTouchEnd);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  });
  useEffect(() => {
    const { current: slider } = myRef;
    slider.addEventListener("touchstart", handleTouchStart);

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("mousemove", handleTouchMove);
      document.removeEventListener("mouseup", handleTouchEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchEnd, handleTouchMove, handleTouchStart]);
  useEffect(() => {
    setThumbPosition(props.value);
  }, [props.value]);

  const keepInBound = value => {
    if (value < 0) value = 0;
    if (value > myRef.current.clientWidth) value = myRef.current.clientWidth;
    return value;
  };

  const changeValue = newValue => {
    if (!myRef.current) return;
    // fix for when the parent container has padding
    newValue = Math.round(newValue) - myRef.current.offsetLeft;
    newValue = keepInBound(newValue);
    setThumbPosition(newValue);
    if (callback) callback(newValue);
  };

  const changeValueBy = delta => {
    if (myRef.current === null) return;
    let newValue = props.value - delta;
    changeValue(newValue);
  };

  const handleMouseDown = e => {
    changeValue(e.clientX);
    document.body.style["pointer-events"] = "none";

    document.addEventListener("mouseup", handleMouseUp, { capture: true });
    document.addEventListener("mousemove", handleMouseMove, { capture: true });
    e.stopPropagation();
  };

  const handleMouseUp = e => {
    document.body.style["pointer-events"] = "auto";
    document.removeEventListener("mouseup", handleMouseUp, { capture: true });
    document.removeEventListener("mousemove", handleMouseMove, {
      capture: true
    });
    e.stopPropagation();
  };

  const handleMouseMove = e => {
    changeValue(e.clientX);
    e.stopPropagation();
  };

  const handleKeyDown = e => {
    if (e.key === "ArrowRight") {
      changeValueBy(-1);
    } else if (e.key === "ArrowLeft") {
      changeValueBy(1);
    }
  };
  return (
    <div
      ref={myRef}
      tabIndex={0}
      className={classes.slider + " " + props.className}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
    >
      <Thumb left={thumbPosition} />
    </div>
  );
}
