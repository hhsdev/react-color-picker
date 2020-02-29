import React, { useState, useRef, useEffect } from "react";
import { createUseStyles, withTheme } from "react-jss";
import ColorBox from "./colorBox";
import HexBox from "./hexBox";
import utils from "./utils";
import ColorComponentPicker from "./colorComponentPicker";

// Fun fact: this is Pantone Color Institute's color of the year 2019 (Living Coral)
const defaultColor = { r: 255, g: 111, b: 97, a: 255 };

const styles = {
  root: {
    display: "inline-block",
    padding: 8,
    borderRadius: 4,
    background: "white",
    boxShadow: "grey 1px 1px 2px"
  },
  text: {
    marginLeft: 8,
    width: "3em",
    padding: 4,
    border: "1px solid grey",
    borderRadius: "0.2em",
    margin: 0
  },
  mb8: {
    marginBottom: 8
  }
};

const useStyles = createUseStyles(styles);

export default function ColorPicker(props) {
  //TODO: make default color overridable
  let { className } = props;
  if (!className) className = "";
  const [color, setColor] = useState(props.color || defaultColor);
  const { r, g, b, a } = color;
  const classes = useStyles(color);

  useEffect(() => {
    if (props.callback) props.callback(color);
  }, [color]);

  return (
    <div className={classes.root + " " + className}>
      <ColorComponentPicker
        from="black"
        to="red"
        className={classes.mb8}
        label="R"
        value={color.r}
        callback={v => setColor({ r: v, g, b, a})}
      />

      <ColorComponentPicker
        from="black"
        to="green"
        className={classes.mb8}
        label="G"
        value={defaultColor.g}
        callback={v => setColor({ r, g: v, b, a })}
      />

      <ColorComponentPicker
        from="black"
        to="blue"
        className={classes.mb8}
        label="G"
        value={defaultColor.b}
        callback={v => setColor({ r, g, b: v, a })}
      />

      <ColorComponentPicker
        from="rgba(0, 0, 0, 0)"
        to="rgba(0, 0, 0, 255)"
        className={classes.mb8}
        label="A"
        value={defaultColor.a}
        callback={v => setColor({ r, g, b, a: v })}
      />

      <div style={{ display: "flex", alignItems: "" }}>
        <ColorBox color={{ r, g, b, a }} />
        <HexBox
          value={utils.toHexString(r, g, b)}
          argFormat="rgb"
          callback={({ r, g, b }) => {
            setColor({ r, g, b, a });
          }}
        />
      </div>
    </div>
  );
}
