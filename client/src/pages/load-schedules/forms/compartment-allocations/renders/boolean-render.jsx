import React from 'react';
import { CheckCircleTwoTone, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const BooleanRender = (text) => {
  const icon =
    text === null || text === undefined ? (
      <CloseCircleOutlined style={{ color: '#880000', fontSize: '16px' }} />
    ) : text === 'Y' || text === 'y' || text === '1' || text === 1 || text === true ? (
      <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
    ) : (
      <CloseCircleOutlined style={{ color: '#ec6e68', fontSize: '16px' }} />
    );

  return <div>{icon}</div>;
};

export default BooleanRender;
