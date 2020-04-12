import React, { useState, useRef, useEffect } from "react";
import { createUseStyles } from "react-jss";
import Slider from "./slider";

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    marginLeft: 8,
    width: "3em",
    padding: 4,
    border: "1px solid grey",
    borderRadius: "0.2em",
    margin: 0,
  },
};

const useStyles = createUseStyles(styles);

export default function ColorComponentPicker(props) {
  const inputRef = useRef();
  const classes = useStyles(styles);
  const {
    background,
    from,
    to,
    className,
    label,
    value,
    callback,
    ...other
  } = props;

  useEffect(() => {
    // don't modify if you're currently writing in the box
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.value = value;
    }
  }, [inputRef, value]);

  return (
    <div className={classes.root + " " + (props.className || "")}>
      <Slider
        background={background}
        from={from}
        to={to}
        value={value}
        {...other}
        onChange={callback}
      />
      <span style={{ marginLeft: 16 }}>{label}</span>
      <input
        ref={inputRef}
        type="text"
        className={classes.text}
        // FIXME: this doesn't check for validity of the input value!
        onChange={(e) => callback(event.target.value)}
      />
    </div>
  );
}
