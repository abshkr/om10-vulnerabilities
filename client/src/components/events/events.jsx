import React, { useState, useEffect } from 'react';
import { Menu, List, Dropdown, Button, Badge } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import { BellOutlined, CloseOutlined, StopOutlined } from '@ant-design/icons';

import { useAudio } from 'hooks';
import _ from 'lodash';

import api, { AUTH, COMMON } from '../../api';
import { useConfig } from 'hooks';

const Events = () => {
  const [playing, toggle, muted, setMuted] = useAudio(COMMON.WARNING_SOUND);
  const { refreshAlarm } = useConfig();

  const [lastSequnce, setLastSequence] = useState(null)
  const [alarms, setAlarms] = useState(JSON.parse(sessionStorage.getItem('alarms')) || []);
  
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState([]);
  
  const onClearAll = () => {
    const unique = [...new Set(alarms.map((item) => `${item?.gen_date}-${item?.message}`))];

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

    setAlarms(filtered);
    sessionStorage.setItem('alarms', JSON.stringify(filtered));

    //This is only to notify other tabs
    localStorage.removeItem('notifying');
    localStorage.setItem('notifying', JSON.stringify(filtered));
  }, [seen]);

  useEffect(() => {
    if (alarms.length === 0 && playing) {
      toggle();
    }
  }, [alarms]);

  const storageSyncTabs = (event) => {
    if (!event) {
      event = window.event; 
    }

    if(!event.newValue) {
      return;          // do nothing if no value to work with
    }

    //Current tab is not active, and other tabs changed alarms
    if (event.key == 'notifying') {
      setAlarms(JSON.parse(event.newValue));
    }
  };

  useEffect(() => {
    window.addEventListener("storage", storageSyncTabs, false);
  }, [])

  const retrieveAlarms = () =>  {
    api.get(AUTH.SESSION, {
        params: {
          prev_sequence: lastSequnce && lastSequnce.length > 0 ? lastSequnce : null,
        },
      })
      .then((res) => {
        const set = res.data?.records?.alarms || [];
        
        if (set.length > 0 && !playing) {
          toggle();
        }

        const payload = [...alarms, ...set];
        const unique = _.uniqBy(payload, 'seq');
        const filtered = seen.length > 0 ? _.filter(unique, (object) => {
          return !seen.includes(`${object?.gen_date}-${object?.message}`);
        }) : unique;
        
        setAlarms(filtered);
        sessionStorage.setItem('alarms', JSON.stringify(filtered));
        if (set.length > 0 && 
          (!lastSequnce || (res.data && parseInt(res.data.records.last_sequence) > parseInt(lastSequnce)))) {
          setLastSequence(res.data?.records?.last_sequence)
        }
      })
      .catch((errors) => {
        console.log("Error, ", errors)
      })
    }

  //
  useEffect(() => {
    const interval = setInterval(retrieveAlarms, refreshAlarm);
    return () => clearInterval(interval);
  }, [alarms, seen])

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
          disabled={alarms.length === 0}
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
          dataSource={alarms}
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
          <Badge count={alarms?.length} offset={[10, -5]}>
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