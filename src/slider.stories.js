import React from "react";
import Slider from "./slider";

export default { title: "Slider" };

export const blue = () => (
  <Slider
    from={{ r: 0, g: 0, b: 0, a: 255 }}
    to={{ r: 255, g: 0, b: 0, a: 255 }}
    value={0}
    onChange={() => ""}
  />
);
