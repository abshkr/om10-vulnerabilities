import React from 'react';
import { Menu, List, Dropdown, Button, Badge } from 'antd';

import { BellOutlined } from '@ant-design/icons';

const data = [
  {
    title: 'Error On Bay 04. Please Check The Journal For More Information',
  },
  {
    title: 'Error On Bay 04. Please Check The Journal For More Information',
  },
  {
    title: 'Error On Bay 04. Please Check The Journal For More Information',
  },
  {
    title: 'Error On Bay 04. Please Check The Journal For More Information',
  },
  {
    title: 'Error On Bay 04. Please Check The Journal For More Information',
  },
];

const menu = (
  <Menu>
    <List
      style={{ padding: 10, paddingTop: 0, paddingBottom: 0 }}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={<p>Omega Event Detected</p>} description={item.title} />
        </List.Item>
      )}
    />
  </Menu>
);

const Events = () => {
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button type="primary" size="large" shape="circle" style={{ marginRight: 7 }}>
        <Badge count={5} offset={[10, -5]}>
          <BellOutlined style={{ transform: 'scale(1.5)' }} />
        </Badge>
      </Button>
    </Dropdown>
  );
};

export default Events;
