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

  const [stateValue, setStateValue] = useState(value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setStateValue(e.target.value);
    }
  };

  const handleChange = (e) => {
    setStateValue(e.target.value);
  };

  useEffect(() => {
    if (callback) callback(stateValue);
  }, [stateValue]);

  return (
    <div className={classes.root + " " + (props.className || "")}>
      <Slider
        background={background}
        from={from}
        to={to}
        value={stateValue}
        {...other}
        callback={setStateValue}
      />
      <span style={{ marginLeft: 16 }}>{label}</span>
      <input
        type="text"
        className={classes.text}
        value={stateValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
