import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const thumbStyles = {
  root: {
    position: "absolute",
    background: "black",
    cursor: "pointer",
    display: "inline-block",
    height: ({ size }) => size,
    width: ({ size }) => size,
    top: -4,
    left: ({ left, size }) => {
      let ret = left - size / 2;
      if (ret < 0) ret = 0;
      if (ret > 255 - size) ret = 255 - size;
      return ret;
    },
    background: "white",
    borderRadius: "50%",
    boxShadow: "grey 0 0 3px",
    userSelect: "none",
  },
};

const useThumbStyles = createUseStyles(thumbStyles);
export default function Thumb(props) {
  const { left, size } = props;
  const classes = useThumbStyles({ left, size });

  return <span className={classes.root}></span>;
}
