import React, { useState, useEffect } from 'react';
import { Menu, List, Dropdown, Button, Badge } from 'antd';

import { BellOutlined, CloseOutlined } from '@ant-design/icons';

import useSWR from 'swr';
import { useAudio } from 'hooks';
import _ from 'lodash';

import { AUTH, COMMON } from '../../api';

const Events = () => {
  const [playing, toggle] = useAudio(COMMON.WARNING_SOUND);

  const { data } = useSWR(AUTH.SESSION);

  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState([]);

  const onVisibleChange = (value) => {
    // stop playing the noise if the sound is playing and the menu is opened.

    if (playing) {
      toggle();
    }

    setVisible(value);
  };

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

  useEffect(() => {
    // play if there are events and the sound is not playing

    if (events.length > 0 && !playing && !visible) {
      toggle();
    }
  }, [events, playing, visible]);

  const menu = (
    <Menu style={{ display: events.length === 0 && 'none' }}>
      <List
        style={{ minWidth: 300 }}
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
      onVisibleChange={onVisibleChange}
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
