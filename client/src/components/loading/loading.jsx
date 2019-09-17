import React from 'react';
import { Icon } from 'antd';

import './loaders.css';

const Loading = () => (
  <div className="loading">
    <Icon type="loading" style={{ fontSize: 24, color: '#68a4ec' }} spin />;
  </div>
);

export default Loading;
