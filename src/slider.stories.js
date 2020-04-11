import React from "react";
import Slider from "./slider";

export default { title: "Slider" };

export const blue = () => (
  <Slider
    from="black"
    to="red"
    value={0}
  />
);
