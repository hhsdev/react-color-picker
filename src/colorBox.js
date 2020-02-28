import React, { useState, useRef, useEffect } from "react";
import { createUseStyles } from "react-jss";

const styles = {
  root: {
    position: "relative",
    width: 100,
    minWidth: 100,
    height: 100,
    borderRadius: 6,
    background:
      'rgba(0, 0, 0, 0) url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/\
9hAAAAHUlEQVQ4jWNgYGAQIYAJglEDhoUBg9+\
FowbQ2gAARjwKARjtnN8AAAAASUVORK5CYII=")',
    boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 4px inset",
    "&::before": {
      display: "inline-block",
      position: "absolute",
      top: 0,
      left: 0,
      width: 100,
      height: 100,
      borderRadius: 6,
      content: '""',
      background: color =>
        `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 255})`,
      boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 4px inset"
    }
  }
};

const useStyles = createUseStyles(styles);

export default function ColorBox(props) {
  const classes = useStyles(props.color);
  return <div className={classes.root}></div>;
}
