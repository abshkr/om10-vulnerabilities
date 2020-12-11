import React, { useState, useEffect } from 'react';
import { Menu, List, Dropdown, Button, Badge } from 'antd';

import { BellOutlined, CloseOutlined, StopOutlined } from '@ant-design/icons';

import useSWR from 'swr';
import { useAudio } from 'hooks';
import _ from 'lodash';

import { AUTH, COMMON } from '../../api';

const Events = () => {
  const [playing, toggle, muted, setMuted] = useAudio(COMMON.WARNING_SOUND);

  const { data } = useSWR(AUTH.SESSION, { refreshInterval: 0 });

  const [alarms, setAlarms] = useState([]);
  const [events, setEvents] = useState([]);

  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState([]);

  const onClearAll = () => {
    const unique = [...new Set(events.map((item) => `${item?.gen_date}-${item?.message}`))];

    const payload = [...seen, ...unique];

    if (playing) {
      toggle();
    }

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

    if (set.length > 0 && !playing) {
      toggle();
    }

    const payload = [...events, ...set];

    setAlarms(payload);
  }, [data, playing]);

  const menu = (
    <Menu style={{ minWidth: 500 }}>
      <div style={{ paddingLeft: 5, paddingRight: 5, display: 'flex' }}>
        <Button type="primary" block onClick={() => setMuted(!muted)} style={{ marginRight: 2.5 }}>
          {muted ? 'Unmute' : 'Mute'}
        </Button>

        <Button
          type="danger"
          block
          onClick={() => onClearAll()}
          style={{ marginLeft: 2.5 }}
          disabled={events.length === 0}
        >
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
    <Dropdown visible={visible} overlay={menu} onVisibleChange={setVisible} trigger={['click']}>
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
