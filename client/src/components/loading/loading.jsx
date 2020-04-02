import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { LoadingContainer } from './style';

const Spinner = <LoadingOutlined style={{ fontSize: 24, color: '#4164e3' }} spin />;

const Loading = () => (
  <LoadingContainer>
    <Spin indicator={Spinner} />
  </LoadingContainer>
);

export default Loading;
