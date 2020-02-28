import React, { useRef, useState, useEffect } from "react";
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
        `rgba(0, 0, 0, 0) linear-gradient(to right, \
rgba(${props.from.r}, ${props.from.g}, ${props.from.b}, ${props.from.a}), \
rgba(${props.to.r}, ${props.to.g}, ${props.to.b}, ${props.to.a}))`,
      content: '""' // must use this for div to show up
    }
  }
};

const useSliderStyles = createUseStyles(sliderSyles);

export default function Slider(props) {
  let classes = useSliderStyles(props);

  const { callback } = props;
  const [ thumbPosition, setThumbPosition ] = useState(props.value);

  useEffect(() => {
    setThumbPosition(props.value);
  }, [props.value]);

  const keepInBound = (value) => {
    if (value < 0) value = 0;
    if (value > myRef.current.clientWidth)
      value = myRef.current.clientWidth;
    return value;
  };

  const changeValue = newValue => {
    // fix for when the parent container has padding
    newValue = newValue - myRef.current.offsetLeft;
    newValue = keepInBound(newValue);
    setThumbPosition(newValue);
    if (callback) callback(newValue);
  };

  const changeValueBy = delta => {
    let newValue = props.value - delta;
    changeValue(newValue);
  };

  const handleMouseDown = e => {
    changeValue(e.clientX);
    document.body.style["pointer-events"] = "none";
    document.addEventListener("touchend", handleMouseUp, { capture: true });
    document.addEventListener("touchmove", handleMouseMove, { capture: true });

    document.addEventListener("mouseup", handleMouseUp, { capture: true });
    document.addEventListener("mousemove", handleMouseMove, { capture: true });
    e.stopPropagation();
  };

  const handleMouseUp = e => {
    document.body.style["pointer-events"] = "auto";
    document.removeEventListener("touchup", handleMouseUp, { capture: true });
    document.removeEventListener("touchmove", handleMouseMove, {
      capture: true
    });

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
  const myRef = useRef();
  return (
    <div
      ref={myRef}
      tabIndex={0}
      className={classes.slider + " " + props.className}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onKeyDown={handleKeyDown}
    >
      <Thumb left={thumbPosition} />
    </div>
  );
}
