import React from "react";
import Slider from "./slider";

export default { title: "Slider" };

export const blue = () => {
  const [v, setV] = React.useState(0);
  return (
    <div>
      <Slider background="blue" value={v} onChange={(newV) => setV(newV)} />
      <p>Value is { v }.</p>
    </div>
  );
};
