import React, { useRef, useState, useEffect, useCallback } from "react";
import Thumb from "./thumb";
import useTouch from "./useTouch";
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

  const { callback } = props;
  const [thumbPosition, setThumbPosition] = useState(props.value);
  const myRef = useRef();

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
    const newValue = thumbPosition - delta;
    console.log(newValue);
    changeValue(newValue);
  };

  const handleKeyDown = e => {
    if (e.key === "ArrowRight") {
      changeValueBy(2);
      //changeValue(thumbPosition + 9);
    } else if (e.key === "ArrowLeft") {
      changeValueBy(-2);
      //changeValue(thumbPosition + 7);
    }
  };

  useTouch(myRef, ({x}) => { changeValue(x)});

  return (
    <div
      ref={myRef}
      tabIndex={0}
      className={classes.slider + " " + props.className}
      onKeyDown={handleKeyDown}
    >
      <Thumb left={thumbPosition} />
    </div>
  );
}
