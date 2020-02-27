import React, { useState } from "react";
import { createUseStyles } from "react-jss";
const thumbStyles = {
  root: {
    position: "absolute",
    background: "black",
    cursor: "pointer",
    display: "inline-block",
    height: "16px",
    width: "16px",
    left: props => props.left - 16,
    background: "white",
    borderRadius: "50%",
    boxShadow: "grey 0 0 2px",
    userSelect: "none"
  }
};

const useThumbStyles = createUseStyles(thumbStyles);
export default function Thumb(props) {
  const classes = useThumbStyles(props);
  return <span className={classes.root}></span>;
}
