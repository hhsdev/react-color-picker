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

const keepInBound = (value, from, to) => {
  if (value < from) value = from;
  if (value > to) value = to;
  return value;
};

/**
 * Converts the touched position to value
 *
 * @param {number} from Lower bound of acceptable output
 * @param {number} to Upper bound of output
 * @param {number} thumbPosition X position of the thumb
 * @param {number} ref Reference to the parent div
 */
const toValue = (from, to, thumbPosition, ref) => {
  if (ref.current) thumbPosition -= ref.current.offsetLeft;
  const ret = Math.round((thumbPosition * to) / sliderWidth);
  return keepInBound(ret, from, to);
};

/**
 * Converts the value from props to position of the thumb on the slider
 *
 * @param {number} to Upper bound of output
 * @param {number} value Value of the input
 */
const toThumbPosition = (to, value) => {
  return Math.round((value * sliderWidth) / to);
};

export default function Slider(props) {
  const { background, value, callback, from = 0, to = 100, className } = props;

  let classes = useSliderStyles({ background });

  const divRef = useRef();

  const changeValue = (newValue) => {
    if (callback) callback(newValue);
    return;
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      changeValue(value + 2);
    } else if (e.key === "ArrowLeft") {
      changeValue(value - 2);
    }
  };

  useTouch(divRef, ({ x }) => changeValue(toValue(from, to, x, divRef)));

  return (
    <div ref={divRef}>
      <div
        tabIndex={0} // this makes the slider focusable via tab
        className={classes.slider + " " + className}
        onKeyDown={handleKeyDown}
      >
        <Thumb left={toThumbPosition(to, value, divRef)} size={thumbSize} />
      </div>
    </div>
  );
}
