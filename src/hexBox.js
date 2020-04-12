import React, { useState, useRef, useEffect } from "react";
import Color from "./color";
import { createUseStyles } from "react-jss";
import utils from "./utils";

const styles = {
  root: {
    border: "1px solid grey",
    color: "#333",
    padding: 4,
    borderRadius: 2,
    width: "4rem",
    margin: 0,
  },
};

const useStyles = createUseStyles(styles);

export default function HexBox(props) {
  const classes = useStyles();

  const { className, callback, value = "#dec0de" } = props;
  const inputRef = useRef();

  useEffect(() => {
    // don't modify if you're currently writing in the box
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.value = value;
    }
  }, [inputRef, value]);

  const handleChange = (event) => {
    callback(event.target.value);
  };

  return (
    <div>
      <span
        style={{
          fontFamily: "Arial",
          color: "#333",
          marginLeft: 16,
          marginRight: 8,
        }}
      >
        Hex:
      </span>
      <input
        ref={inputRef}
        type="text"
        onChange={handleChange}
        className={classes.root + " " + className}
        onBlur={(e) => (inputRef.current.value = value)}
      />
    </div>
  );
}
