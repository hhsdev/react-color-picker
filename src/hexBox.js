import React, { useState, useRef, useEffect } from "react";
import { createUseStyles } from "react-jss";
import utils from "./utils";

const styles = {
  root: {
    border: "1px solid grey",
    color: "#333",
    padding: 4,
    borderRadius: 2,
    width: "4rem",
    margin: 0
  }
};

const useStyles = createUseStyles(styles);

export default function HexBox(props) {
  const classes = useStyles();
  const { className, callback, argFormat, value } = props;
  const [hexString, setHexString] = useState(value || '');
  const inputRef = useRef();

  useEffect(() => setHexString(value || ''), [value]);
  useEffect(() => {
    if (callback) {
      if (!argFormat || argFormat === "hex") {
        if (utils.isValidHexString(hexString)) {
          callback(hexString);
        }
      } else if (argFormat === "rgb") {
        const rgb = utils.toRgb(hexString);
        if (rgb !== null) callback(rgb);
      }
      //TODO: Add more arguments formats
    }
    inputRef.current.value = hexString;
  }, [hexString, inputRef]);

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      setHexString(inputRef.current.value);
    }
  };
  const selectText = e => inputRef.current.select();
  return (
    <div>
      <span
        style={{
          fontFamily: "Arial",
          color: "#333",
          marginLeft: 16,
          marginRight: 8
        }}
      >
        Hex:
      </span>
      <input
        ref={inputRef}
        type="text"
        className={classes.root + " " + className}
        onKeyDown={handleKeyDown}
        onBlur={e => (inputRef.current.value = props.value)}
      />
    </div>
  );
}
