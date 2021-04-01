import React, { useState, useEffect } from 'react';
import { Tag, Timeline } from 'antd';
import useSWR from 'swr';

import { JOURNAL } from '../../../api';

const TimelineComponent = () => {
  const { data, isValidating } = useSWR(
    `${JOURNAL.READ}?start_date=2021-03-26%2002:46:38&end_date=2021-03-26%2005:46:38`,
    {
      refreshInterval: 5000,
    }
  );

  return (
    <Timeline mode="left" reverse={true} style={{ paddingTop: 10 }}>
      {data?.records?.reverse()?.map((entry) => (
        <Timeline.Item key={entry?.seq} color="green">
          <p>
            <strong>{entry?.gen_date}</strong>
          </p>
          <p>{entry?.message}</p>
          <p>
            <Tag>{entry?.msg_event}</Tag>
          </p>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default TimelineComponent;
