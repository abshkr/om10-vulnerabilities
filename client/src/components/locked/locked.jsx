import React from 'react';
import { FileProtectOutlined } from '@ant-design/icons';
import './locked.css';

const Locked = () => (
  <div>
    <div className="text">Unauthorized</div>
    <div className="lock">
      <FileProtectOutlined style={{ color: '#538aef', fontSize: 70 }} />{' '}
    </div>
  </div>
);

export default Locked;
