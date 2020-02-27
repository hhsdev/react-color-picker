import React, {useState} from "react";
import Thumb from "./thumb";
import { createUseStyles } from "react-jss";

const sliderSyles = {
  slider: {
    position: "relative",
    width: "200px",
    height: "16px",
    borderRadius: "8px",
    background:
      'rgba(0, 0, 0, 0) url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/\
9hAAAAHUlEQVQ4jWNgYGAQIYAJglEDhoUBg9+\
FowbQ2gAARjwKARjtnN8AAAAASUVORK5CYII=")',
    "&::before": {
      display: "inline-block",
      position: "absolute",
      top: 0,
      left: 0,
      width: "200px",
      height: "16px",
      borderRadius: "8px",
      background: props =>
        `rgba(0, 0, 0, 0) linear-gradient(to right, \
rgba(${props.r}, ${props.g}, ${props.b}, 0), rgba(${props.r}, ${props.g}, ${props.b}, 255))`,
      content: '""' // must use this for div to show up
    }
  }
};

const useSliderStyles = createUseStyles(sliderSyles);

export default function Slider(props) {
  const classes = useSliderStyles(props);
  const [left, setLeft] = useState("0%");
  const moveTo = (e) => {
    setLeft(e.clientX);
  }
  return (
    <div className={classes.slider} onClick={(e) => moveTo(e)}>
      <Thumb left={left} />
    </div>
  );
}
