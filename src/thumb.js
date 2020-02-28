import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const thumbSize = 16;
const thumbStyles = {
  root: {
    position: "absolute",
    background: "black",
    cursor: "pointer",
    display: "inline-block",
    height: thumbSize,
    width: thumbSize,
    top: -4,
    left: left => {
      let ret = left - (thumbSize / 2);
      if (ret < 0) ret = 0;
      if (ret > 255 - thumbSize) ret = 255 - thumbSize;
      return ret;
    },
    background: "white",
    borderRadius: "50%",
    boxShadow: "grey 0 0 3px",
    userSelect: "none"
  }
};

const useThumbStyles = createUseStyles(thumbStyles);
export default function Thumb(props) {
  const classes = useThumbStyles(props.left);

  return (
    <span
      className={classes.root}
    ></span>
  );
}
