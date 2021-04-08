import React, { useState, useEffect } from 'react';
import { Tag, Timeline } from 'antd';
import useSWR from 'swr';
import { UserOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { words } from 'lodash';
import { JOURNAL } from '../../../api';

const TimelineComponent = ({ event, onClick }) => {
  const [records, setRecords] = useState([]);

  const { data } = useSWR(JOURNAL.READ, { refreshInterval: 5000 });

  function onIconMapping(message) {
    const wordList = words(message);

    if (wordList.includes('Login') && wordList.includes('information')) {
      return <UserOutlined style={{ fontSize: '16px' }} />;
    }

    if (wordList.includes('Logout')) {
      return <UserOutlined style={{ fontSize: '16px', color: 'orange' }} />;
    }

    if (wordList.includes('can') && wordList.includes('not')) {
      return <CloseCircleOutlined style={{ fontSize: '16px', color: 'red' }} />;
    }

    if (wordList.includes('failed')) {
      return <CloseCircleOutlined style={{ fontSize: '16px', color: 'red' }} />;
    }

    return <ExclamationCircleOutlined style={{ fontSize: '16px' }} />;
  }

  useEffect(() => {
    const entries = data?.records || [];

    const filtered =
      entries?.filter((entry) => {
        if (event === 'all') {
          return true;
        }

        return entry?.msg_event === event;
      }) || [];

    setRecords(filtered);
  }, [data, event]);

  return (
    <Timeline mode="left" style={{ paddingTop: 10 }}>
      {records?.map((entry) => (
        <Timeline.Item key={entry?.seq} color="green" dot={onIconMapping(entry?.message)}>
          <a style={{ marginBottom: 0 }} onClick={() => onClick(entry?.gen_date, null, undefined)}>
            <strong>{entry?.gen_date}</strong>
            <Tag style={{ marginLeft: 5 }}>{entry?.msg_event}</Tag>
          </a>
          <div className="timeline-message" style={{ marginBottom: 3 }}>
            {entry?.message}
          </div>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default TimelineComponent;
