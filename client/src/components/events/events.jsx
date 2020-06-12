import React, { useState, useEffect } from 'react';
import { Menu, List, Dropdown, Button, Badge } from 'antd';

import { BellOutlined, CloseOutlined } from '@ant-design/icons';

import useSWR from 'swr';
import _ from 'lodash';

import { fetcher } from '../../utils';
import { AUTH } from '../../api';

const Events = () => {
  const { data } = useSWR(AUTH.SESSION, fetcher);

  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState([]);

  const onRemove = (message) => {
    let payload = [...seen, message];

    setSeen(payload);
  };

  useEffect(() => {
    const payload = data?.records?.alarms || [];

    const filtered = _.filter(payload, (object) => {
      return !seen.includes(object.message);
    });

    setEvents(filtered.slice(0, 4));
  }, [data, seen]);

  const menu = (
    <Menu style={{ display: events.length === 0 && 'none' }}>
      <List
        itemLayout="horizontal"
        dataSource={events}
        size="small"
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="danger"
                size="small"
                icon={<CloseOutlined />}
                onClick={() => onRemove(item.message)}
                shape="circle"
              ></Button>,
            ]}
          >
            <List.Item.Meta title={item.gen_date} description={item.message} />
          </List.Item>
        )}
      />
    </Menu>
  );

  return (
    <Dropdown
      visible={visible}
      overlay={menu}
      onVisibleChange={setVisible}
      trigger={['click']}
      disabled={events.length === 0}
    >
      <Button type="primary" size="large" shape="circle" style={{ marginRight: 7 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Badge count={events?.length} offset={[10, -5]}>
            <BellOutlined style={{ transform: 'scale(1.5)' }} />
          </Badge>
        </div>
      </Button>
    </Dropdown>
  );
};

export default Events;
