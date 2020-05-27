import React from 'react';
import { Badge } from 'antd';

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

const Equipment = ({ image, style, onClick, showName }) => {
  if (image) {
    return (
      <div style={{ ...style }}>
        <img style={{ ...style }} onClick={onClick} src={matrix[image?.toLowerCase()]} alt="equipment" />
        <div style={{ height: 25, textAlign: 'center' }}>
          <strong>{showName}</strong>
        </div>
      </div>
    );
  }

  return null;
};

export default Equipment;
