import React from 'react';
import Title from '../title';
import { Card } from 'antd';
import './page.css';

const Page = ({ name, page, block, children }) => {
  return (
    <div>
      <Title page={!!name ? name : page} />
      <Card title={name}>{children}</Card>
    </div>
  );
};

export default Page;
