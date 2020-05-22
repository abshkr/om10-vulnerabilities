import React from 'react';

import t from './t.png';
import f from './f.png';
import e from './e.png';
import r from './r.png';
import s from './s.png';
import x from './x.png';
import p from './p.png';

const matrix = {
  t,
  f,
  e,
  r,
  s,
  x,
  p,
};

const Equipment = ({ image, style }) => {
  if (image) {
    return <img style={{ ...style }} src={matrix[image]} alt="equipment" />;
  }

  return null;
};

export default Equipment;
