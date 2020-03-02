import React from 'react';
import { ToolOutlined } from '@ant-design/icons';
import auth from '../../auth';
import { WorkInProgressContainer, IconContainer } from './style';

const WorkInProgress = () => {
  return (
    <WorkInProgressContainer>
      <IconContainer>
        <ToolOutlined style={{ fontSize: 30 }} />
        <h1>Work In Progress</h1>
      </IconContainer>
    </WorkInProgressContainer>
  );
};

export default auth(WorkInProgress);
