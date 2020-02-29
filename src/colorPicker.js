import React, { useState, useRef, useEffect } from "react";
import { createUseStyles } from "react-jss";
import Slider from "./slider";
import ColorBox from "./colorBox";
import HexBox from "./hexBox";
import utils from "./utils";

// Fun fact: this is Pantone Color Institute's color of the year 2019 (Living Coral)
const defaultColor = { r: 255, g: 111, b: 97, a: 255 };

const styles = {
  root: {
    display: "inline-block",
    padding: 8,
    borderRadius: 4,
    boxShadow: "grey 1px 1px 2px",
  },
  SliderContainer: {
    display: "flex",
    alignItems: "center"
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

export default function ColorSliders() {
  const [color, setColor] = useState(defaultColor);
  const { r, g, b, a } = color;
  const classes = useStyles({ r, g, b, a });

  const rInput = useRef();
  const gInput = useRef();
  const bInput = useRef();
  const aInput = useRef();

  useEffect(() => {
    rInput.current.value = r;
    gInput.current.value = g;
    bInput.current.value = b;
    aInput.current.value = a;
  }, [color]);

  const redSliderProps = {
    from: { r: 0, g: 0, b: 0, a: 255 },
    to: { r: 255, g: 0, b: 0, a: 255 },
    value: r,
    callback: (v) => setColor({r: v, g, b, a})
  };

  const greenSliderProps = {
    from: { r: 0, g: 0, b: 0, a: 255 },
    to: { r: 0, g: 255, b: 0, a: 255 },
    value: g,
    callback: (v) => setColor({r, g: v, b, a})
  };

  const blueSliderProps = {
    from: { r: 0, g: 0, b: 0, a: 255 },
    to: { r: 0, g: 0, b: 255, a: 255 },
    value: b,
    callback: (v) => setColor({r, g, b: v, a})
  };

  const alphaSliderProps = {
    from: { r: 0, g: 0, b: 0, a: 0 },
    to: { r: 0, g: 0, b: 0, a: 255 },
    value: a,
    callback: (v) => setColor({r, g, b, a: v})
  };

  return (
    <div className={classes.root}>
      <div className={classes.SliderContainer + " " + classes.mb8}>
        <Slider {...redSliderProps} />
        <span style={{ marginLeft: 16 }}>R</span>
        <input type="text" ref={rInput} className={classes.text} />
      </div>

      <div className={classes.SliderContainer + " " + classes.mb8}>
        <Slider {...greenSliderProps} />
        <span style={{ marginLeft: 16 }}>G</span>
        <input type="text" ref={gInput} className={classes.text} />
      </div>

      <div className={classes.SliderContainer + " " + classes.mb8}>
        <Slider {...blueSliderProps} />
        <span style={{ marginLeft: 16 }}>B</span>
        <input type="text" ref={bInput} className={classes.text} />
      </div>

      <div className={classes.SliderContainer + " " + classes.mb8}>
        <Slider {...alphaSliderProps} />
        <span style={{ marginLeft: 16 }}>A</span>
        <input type="text" ref={aInput} className={classes.text} />
      </div>

      <div style={{ display: "flex", alignItems: "" }}>
        <ColorBox color={{ r, g, b, a }} />
        <HexBox value={utils.toHexString(r, g, b)} argFormat="rgb" callback={({r, g, b}) => {setColor({r, g, b, a})}}/>
      </div>
    </div>
  );
}
