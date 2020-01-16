import React from 'react';
import { Icon } from 'antd';
import auth from '../../auth';
import { WorkInProgressContainer, IconContainer } from './style';

const WorkInProgress = () => {
  return (
    <WorkInProgressContainer>
      <IconContainer>
        <Icon type="tool" style={{ fontSize: 30 }} />
        <h1>Work In Progress</h1>
      </IconContainer>
    </WorkInProgressContainer>
  );
};

export default auth(WorkInProgress);
