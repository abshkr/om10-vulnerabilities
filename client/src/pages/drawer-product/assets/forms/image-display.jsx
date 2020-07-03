import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import { DRAWER_PRODUCTS } from 'api';
import useSWR from 'swr';
import './style.css';

const ImageDisplay = ({onImageClick, refresh = "" }) => {
  const { data: payload, revalidate } = useSWR(DRAWER_PRODUCTS.IMAGES);

  const [selected, setSelected] = useState("");

  const onSelect = (v) => {
    setSelected(v.target.getAttribute("value"));
    onImageClick(v)
  }

  useEffect(() => {
    revalidate();
  }, [refresh]);
  
  return (
    <div className="flex-container">
      {payload?.records.map((item, index) => (
        <div>
          {item.name === selected? 
            <div key={index} style={{
              display: 'flex', 
              flexDirection: "column", 
              alignItems: "center",
              width: 140,
              border: "1px solid lightblue",
            }}
            >
              <div style={{
                background: `url('${item.icon}') no-repeat center center/cover`,
                height: 65,
                width: 50,
              }} 
              />
              <div style={{ height: 25, textAlign: 'center'}}>
                <a value={item.name} onClick={onSelect} >{item.name}</a>
              </div>
            </div>
          :
            <div key={index} style={{
              display: 'flex', 
              flexDirection: "column", 
              alignItems: "center",
              width: 140,
            }}
            >
              <div style={{
                background: `url('${item.icon}') no-repeat center center/cover`,
                height: 65,
                width: 50,
              }} 
              ><a value={item.name} onClick={onSelect} style={{
                display: 'block',
                height: '100%',
                width: '100%',
                textDecoration: 'none',
              }}></a>
              </div>
              <div style={{ height: 25, textAlign: 'center'}}>
                <a value={item.name} onClick={onSelect} >{item.name}</a>
              </div>
            </div>
          }
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;
	