import React, { useRef, useState, useEffect, useCallback } from "react";
import Thumb from "./thumb";
import useTouch from "./useTouch";
import { createUseStyles } from "react-jss";

const sliderWidth = 255;
const thumbSize = 16;

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
      outline: "none",
    },
    "&::before": {
      display: "inline-block",
      position: "absolute",
      top: 0,
      left: 0,
      width: sliderWidth,
      height: "8px",
      borderRadius: "8px",
      background: ({ background }) => background,
      content: '""', // must use this for div to show up
    },
  },
};

const useSliderStyles = createUseStyles(sliderSyles);

const toValue = (to, position) => {
  position -= 16;
  return Math.round((position * to) / sliderWidth);
};

const toThumb = (to, value) => {
  return Math.round((value * sliderWidth) / to);
};

export default function Slider(props) {
  const { background, value, callback, from = 0, to = 100, className } = props;

  let classes = useSliderStyles({ background });

  const divRef = useRef();

  const keepInBound = (value) => {
    if (value < 0) value = 0;
    if (value > divRef.current.clientWidth) value = divRef.current.clientWidth;
    return value;
  };

  const changeValue = (newValue) => {
    if (!divRef.current) return;
    if (callback) callback(newValue);
    return;
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      changeValue(to, value + 2);
    } else if (e.key === "ArrowLeft") {
      changeValue(to, value - 2);
    }
  };

  useTouch(divRef, ({ x }) => changeValue(toValue(to, x)));
  return (
    <div ref={divRef}>
      <div
        tabIndex={0} // this makes the slider focusable via tab
        className={classes.slider + " " + className}
        onKeyDown={handleKeyDown}
      >
        <Thumb left={toThumb(to, value)} size={thumbSize} />
      </div>
    </div>
  );
}
