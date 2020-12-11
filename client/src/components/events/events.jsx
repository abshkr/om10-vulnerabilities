import React, { useState, useEffect } from 'react';
import { Menu, List, Dropdown, Button, Badge } from 'antd';

import { BellOutlined, CloseOutlined, StopOutlined } from '@ant-design/icons';

import useSWR from 'swr';
import { useAudio, usePrevious } from 'hooks';
import _ from 'lodash';

import { AUTH, COMMON } from '../../api';

const Events = () => {
  const [playing, toggle] = useAudio(COMMON.WARNING_SOUND);

  const { data } = useSWR(AUTH.SESSION, { refreshInterval: 1000 });

  const [alarms, setAlarms] = useState([]);
  const [events, setEvents] = useState([
    {
      gen_date: Math.random(0, 5),
      message: 'hi',
    },

    {
      gen_date: Math.random(0, 5),
      message: 'hi',
    },

    {
      gen_date: Math.random(0, 5),
      message: 'hi',
    },
  ]);

  const [muted, setMuted] = useState(false);

  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState([]);

  const prevEvents = usePrevious(events);

  const onClearAll = () => {
    const unique = [...new Set(events.map((item) => `${item?.gen_date}-${item?.message}`))];

    const payload = [...seen, ...unique];

    setSeen(payload);
  };

  const onRemove = (message) => {
    let payload = [...seen, message];

    setSeen(payload);
  };

  useEffect(() => {
    const payload = alarms || [];

    const filtered = _.filter(payload, (object) => {
      return !seen.includes(`${object?.gen_date}-${object?.message}`);
    });

    setEvents(filtered);
  }, [alarms, seen]);

  useEffect(() => {
    const set = data?.records?.alarms || [];

    const payload = [...events, ...set];

    setAlarms(payload);
  }, [data]);

  useEffect(() => {
    if (events.length > 0 && events.length !== prevEvents?.length && !playing && !muted) {
      toggle();
    }

    if (events.length === 0 && playing && !muted) {
      toggle();
    }

    if (playing && muted) {
      toggle();
    }
  }, [events, prevEvents, playing, muted]);

  const menu = (
    <Menu style={{ display: events.length === 0 && 'none' }}>
      <div style={{ paddingLeft: 5, paddingRight: 5, display: 'flex' }}>
        <Button type="primary" block onClick={() => setMuted(!muted)} style={{ marginRight: 2.5 }}>
          {muted ? 'Unmute' : 'Mute'}
        </Button>

        <Button type="danger" block onClick={() => onClearAll()} style={{ marginLeft: 2.5 }}>
          Clear All
        </Button>
      </div>

      <List
        style={{ width: '100%' }}
        itemLayout="horizontal"
        dataSource={events}
        size="small"
        renderItem={(item) => (
          <List.Item
            style={{ minWidth: 500 }}
            actions={[
              <Button
                type="danger"
                size="small"
                icon={<CloseOutlined />}
                onClick={() => onRemove(`${item?.gen_date}-${item?.message}`)}
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
            <StopOutlined
              style={{ transform: 'scale(1s)', position: 'absolute', display: muted ? '' : 'none' }}
            />
            <BellOutlined style={{ transform: 'scale(1.5)' }} />
          </Badge>
        </div>
      </Button>
    </Dropdown>
  );
};

export default Events;
