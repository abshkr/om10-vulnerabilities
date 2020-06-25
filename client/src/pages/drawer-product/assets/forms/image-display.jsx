import React from 'react';

import _ from 'lodash';
import { DRAWER_PRODUCTS } from 'api';
import useSWR from 'swr';
import './style.css';

const ImageDisplay = ({onImageClick}) => {
  const { data: payload } = useSWR(DRAWER_PRODUCTS.IMAGES);
  
  return (
    <div className="flex-container">
      {payload?.records.map((item, index) => (
        <div key={index} style={{
          display: 'flex', 
          flexDirection: "column", 
          alignItems: "center",
          width: 140}}
        >
          <div style={{
            background: `url('${item.icon}') no-repeat center center/cover`,
            height: 65,
            width: 50,
          }} 
          />
          <div style={{ height: 25, textAlign: 'center' }}>
            <a value={item.name} onClick={onImageClick}>{item.name}</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;
