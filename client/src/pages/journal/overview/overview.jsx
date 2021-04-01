import React, { useState } from 'react';
import { Row, Col, Card, Select, Statistic } from 'antd';
import useSWR from 'swr';

import { JOURNAL } from 'api';

import Heatmap from './heatmap';
import Timeline from './timeline';
import YesterdayVsToday from './yesterday-vs-today';
import Events from './events';

export default function Overview() {
  const { data: events, isValidating: isEventsLoading } = useSWR(JOURNAL.EVENT_TYPES);

  const [event, setEvent] = useState('all');

  const { data: overview, isValidating: isOverViewLoading } = useSWR(
    `${JOURNAL.OVERVIEW}${event === 'all' ? '' : `?msg_event=${event}`}`
  );

  const isInitialLoading = !overview;

  return (
    <div>
      <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 10 }}>
        <Col span={8} />

        <Col span={8} />

        <Col span={8} style={{ paddingRight: 0 }}>
          <Select value={event} onChange={setEvent} style={{ width: '100%' }} placeholder="Type">
            <Select.Option value="all">ALL</Select.Option>

            {events?.records?.map((event) => (
              <Select.Option key={event?.message} value={event?.message}>
                {event?.message}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Col>

      <Row>
        <Col span={16}>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <Card size="small" loading={isInitialLoading}>
                <Statistic title="Over the Last 24 Hours" value={overview?.day} suffix="Records" />
              </Card>
            </Col>

            <Col span={12} style={{ paddingRight: 15 }}>
              <Card size="small" loading={isInitialLoading}>
                <Statistic title="Over the Last 7 Days" value={overview?.week} suffix="Records" />
              </Card>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col span={24} style={{ paddingRight: 15 }}>
              <Card title="Events By Weekday" size="small">
                <Events />
              </Card>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col span={12}>
              <Card title="Alarm Heatmap" size="small">
                <Heatmap />
              </Card>
            </Col>

            <Col span={12} style={{ paddingRight: 15 }}>
              <Card title="Alarm Comparison" size="small">
                <YesterdayVsToday yesterday={overview?.yesterday} today={overview?.today} />
              </Card>
            </Col>
          </Row>
        </Col>

        <Col span={8}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Card size="small" loading={isInitialLoading}>
                <Statistic title="Over the Last 30 Days" value={overview?.month} suffix="Records" />
              </Card>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Card
                title="Timeline"
                size="small"
                style={{ height: 710 }}
                bodyStyle={{ overflowY: 'scroll', maxHeight: 670 }}
              >
                <Timeline />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
