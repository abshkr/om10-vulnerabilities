import React from 'react';
import { Spin, Icon } from 'antd';

import './loaders.css';

const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#68a4ec' }} spin />;

const Loading = () => (
  <div className="loading">
    <Spin indicator={antIcon} />
  </div>
);

export default Loading;
