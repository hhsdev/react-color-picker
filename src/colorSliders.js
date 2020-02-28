import React, { useState, useRef, useEffect } from "react";
import { createUseStyles } from "react-jss";
import Slider from "./slider";
import ColorBox from "./colorBox";

const styles = {
  root: {
    display: "inline-block",
    padding: 8,
    borderRadius: 4,
    boxShadow: "grey 1px 1px 2px"
  },
  flexContainer: {
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
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);
  const [a, setA] = useState(255);

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
  }, [r, g, b, a]);

  const produceColorString = (r, g, b, a) => {
    const toHex = (v) => (v > 0xf ? '' : '0') + v.toString(16);
    return ["#", toHex(r), toHex(g), toHex(b) ].join('');
  };
  return (
    <div className={classes.root}>
      <div className={classes.flexContainer + " " + classes.mb8}>
        <Slider
          from={{ r: 0, g: 0, b: 0, a: 255 }}
          to={{ r: 255, g: 0, b: 0, a: 255 }}
          value={r}
          onChange={setR}
        />
        <span style={{ marginLeft: 16 }}>R</span>
        <input type="text" ref={rInput} className={classes.text} />
      </div>

      <div className={classes.flexContainer + " " + classes.mb8}>
        <Slider
          from={{ r: 0, g: 0, b: 0, a: 255 }}
          to={{ r: 0, g: 255, b: 0, a: 255 }}
          value={g}
          onChange={setG}
        />
        <span style={{ marginLeft: 16 }}>G</span>
        <input type="text" ref={gInput} className={classes.text} />
      </div>

      <div className={classes.flexContainer + " " + classes.mb8}>
        <Slider
          from={{ r: 0, g: 0, b: 0, a: 255 }}
          to={{ r: 0, g: 0, b: 255, a: 255 }}
          value={b}
          onChange={setB}
        />
        <span style={{ marginLeft: 16 }}>B</span>
        <input type="text" ref={bInput} className={classes.text} />
      </div>

      <div className={classes.flexContainer + " " + classes.mb8}>
        <Slider
          from={{ r: 0, g: 0, b: 0, a: 0 }}
          to={{ r: 0, g: 0, b: 0, a: 255 }}
          value={a}
          onChange={setA}
        />
        <span style={{ marginLeft: 16 }}>A</span>
        <input type="text" ref={aInput} className={classes.text} />
      </div>
      <div style={{ display: "flex" }}>
        <ColorBox color={{ r, g, b, a }} />
        <span style={{ fontFamily: "Arial", color: "#333", marginLeft: 16 }}>
          Hex: {produceColorString(r, g, b, a)}
        </span>
      </div>
    </div>
  );
}
