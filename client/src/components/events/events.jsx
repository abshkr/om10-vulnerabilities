import React, { useState, useEffect } from 'react';
import { Menu, List, Dropdown, Button, Badge } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import { BellOutlined, CloseOutlined, StopOutlined } from '@ant-design/icons';

import useSWR from 'swr';
import { useAudio } from 'hooks';
import _ from 'lodash';

import { AUTH, COMMON } from '../../api';
import { useConfig } from 'hooks';

const Events = () => {
  const [playing, toggle, muted, setMuted] = useAudio(COMMON.WARNING_SOUND);
  const { refreshAlarm } = useConfig();

  const { data } = useSWR(AUTH.SESSION, { refreshInterval: refreshAlarm, refreshWhenHidden: true });

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
    /* // testing 
    const mockups = [];
    for (let i=0; i<100; i++) {
      mockups.push({
        gen_date: '2021-04-20 10:10:10',
        message: 'alarm ' + i,
      });
    }
    setEvents(mockups); */
  }, [alarms, seen]);

  useEffect(() => {
    const set = data?.records?.alarms || [];

    if (set.length > 0 && !playing) {
      toggle();
    }

    const payload = [...events, ...set];

    setAlarms(payload);
  }, [data]);

  useEffect(() => {
    if (events.length === 0 && playing) {
      toggle();
    }
  }, [events]);

  const menu = (
    <Menu style={{ minWidth: 200 }}>
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

      <Scrollbars
        style={{
          height: 'calc(100vh - 235px)',
          width: '25vw',
          marginTop: 5,
          padding: 5,
        }}
      >
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
      </Scrollbars>
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
