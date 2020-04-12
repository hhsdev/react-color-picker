import React from 'react';
import HexBox from './hexBox';

export default { title: "HexBox" };

export const normal = () => (
  <HexBox callback={(v) => console.log(v)} />
);
