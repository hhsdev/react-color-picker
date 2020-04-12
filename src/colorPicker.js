import React, { useState, useRef, useEffect } from "react";
import { createUseStyles } from "react-jss";

import Color from './color';
import ColorBox from "./colorBox";
import HexBox from "./hexBox";
import utils from "./utils";
import ColorComponentPicker from "./colorComponentPicker";

// Fun fact: this is Pantone Color Institute's color of the year 2019 (Living Coral)
const defaultColor = new Color({ r: 255, g: 111, b: 97, a: 255 });

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
  const {
    className = "",
    initialColor = defaultColor,
    callback,
    exportFormat = "hex",
    ...other
  } = props;

  let initialColorFormat = "hex";

  useEffect(() => {
    initialColorFormat = utils.determineColorFormat(initialColor);
  }, [initialColor]);


  const [color, setColor] = useState(initialColor);
  const { r, g, b, a } = color;
  const classes = useStyles(color);

  useEffect(() => {
    if (props.callback) props.callback(color);
  }, [color]);

  return (
    <div className={classes.root + " " + className}>
      <ColorComponentPicker
        background="linear-gradient(to right, black, red)"
        from={0}
        to={255}
        className={classes.mb8}
        label="R"
        value={color.r}
        callback={v => setColor(new Color({ r: v, g, b, a }))}
      />

      <ColorComponentPicker
        background="linear-gradient(to right, black, green)"
        from={0}
        to={255}
        className={classes.mb8}
        label="G"
        value={color.g}
        callback={v => setColor(new Color({ r, g: v, b, a }))}
      />

      <ColorComponentPicker
        background="linear-gradient(to right, black, blue)"
        from={0}
        to={255}
        className={classes.mb8}
        label="B"
        value={color.b}
        callback={v => setColor(new Color({ r, g, b: v, a }))}
      />

      <ColorComponentPicker
        background="linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 255))"
        from={0}
        to={255}
        className={classes.mb8}
        label="A"
        value={color.a}
        callback={v => setColor(new Color({ r, g, b, a: v }))}
      />

      <div style={{ display: "flex", alignItems: "" }}>
        <ColorBox color={{ r, g, b, a }} />
        <HexBox
          value={utils.toHexString(r, g, b)}
          callback={(v) => {
            const newColor = Color.from(v);
            if (newColor) setColor(newColor);
          }}
        />
      </div>
    </div>
  );
}
