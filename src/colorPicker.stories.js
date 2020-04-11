import React, { useState } from "react";
import Color from "./color";
import ColorPicker from "./colorPicker";
import { createUseStyles } from "react-jss";

export default { title: "Colored Sliders" };

export const simple = () => <ColorPicker />;

const styles = {
  root: {
    padding: 24,
    paddingBottom: 100,
    background: color =>
      `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 255})`
  },
  picker: {
    zIndex: 4,
  }
};

const useStyles = createUseStyles(styles);
export const useCase = () => {
  const [color, setColor] = useState(new Color({ r: 100, g: 100, b: 100, a: 255 }));
  const classes = useStyles(color);
  return (
    <div className={classes.root}>
      <ColorPicker className={classes.picker} callback={setColor} />
    </div>
  );
};
