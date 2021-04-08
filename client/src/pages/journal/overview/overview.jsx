import React, { useState } from 'react';
import { Row, Col, Card, Select, Statistic } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import moment from 'moment';

import { JOURNAL } from 'api';

import Heatmap from './heatmap';
import Timeline from './timeline';
import Events from './events';

import { OverviewContainer } from './style';
import { DATE_TIME_FORMAT } from 'constants/settings';

export default function Overview({ doSearch, setTab, setRange }) {
  const { t } = useTranslation();

  const { data: events, isValidating: isEventsLoading } = useSWR(JOURNAL.EVENT_TYPES);

  const [event, setEvent] = useState('all');

  const { data: overview } = useSWR(JOURNAL.OVERVIEW);

  const isInitialLoading = !overview;

  const startOfToday = moment().startOf('day').format(DATE_TIME_FORMAT);
  const endOfToday = moment().endOf('day').format(DATE_TIME_FORMAT);

  const startOfYesterday = moment().subtract(1, 'day').startOf('day').format(DATE_TIME_FORMAT);
  const endOfYesterday = moment().subtract(1, 'day').endOf('day').format(DATE_TIME_FORMAT);

  function onNavigateToHistorical(start, end, messageClass = undefined) {
    const startIndex = start;
    const endIndex = end || moment().format(DATE_TIME_FORMAT);

    doSearch({
      end_date: endIndex,
      msg_class: messageClass,
      msg_event: undefined,
      start_date: startIndex,
      target_str: undefined,
      use_date_range: undefined,
    });

    setRange(startIndex, endIndex);

    setTab('2');
  }

  return (
    <OverviewContainer>
      <Row>
        <Col span={16}>
          <Row gutter={[10, 10]}>
            <Col span={8}>
              <Card className="statistic" size="small" loading={isInitialLoading}>
                <Statistic title="Over the Last 24 Hours" value={overview?.day} suffix="Journal Entries" />
              </Card>
            </Col>

            <Col span={8}>
              <Card className="statistic" size="small" loading={isInitialLoading}>
                <Statistic title="Over the Last 7 Days" value={overview?.week} suffix="Journal Entries" />
              </Card>
            </Col>

            <Col span={8} style={{ paddingRight: 15 }}>
              <Card className="statistic" size="small" loading={isInitialLoading}>
                <Statistic title="Over the Last 30 Days" value={overview?.month} suffix="Journal Entries" />
              </Card>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col span={24} style={{ paddingRight: 15 }}>
              <Card title="Events By Weekday Over The Last 7 Days" size="small">
                <Events data={overview?.catetories} />
              </Card>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col span={24} style={{ paddingRight: 15 }}>
              <Card title="Alarm Heatmap" size="small">
                <Heatmap data={overview?.alarms} onClick={onNavigateToHistorical} />
              </Card>
            </Col>
          </Row>
        </Col>

        <Col span={8}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Card size="small" loading={isInitialLoading}>
                <Statistic
                  title="Daily Alarm Comparison"
                  value={overview?.today}
                  suffix={
                    <div>
                      <a onClick={() => onNavigateToHistorical(startOfToday, endOfToday, 'ALARM')}>
                        Alarms Today
                      </a>{' '}
                      /{' '}
                      <a onClick={() => onNavigateToHistorical(startOfYesterday, endOfYesterday, 'ALARM')}>
                        Alarms Yesterday ({overview?.yesterday})
                      </a>
                    </div>
                  }
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Card
                title="Timeline"
                size="small"
                style={{ height: 588 }}
                bodyStyle={{ overflowY: 'scroll', maxHeight: 538 }}
                extra={[
                  <Select
                    value={event}
                    onChange={setEvent}
                    style={{ width: 100 }}
                    placeholder="Type"
                    loading={isEventsLoading}
                  >
                    <Select.Option value="all">ALL</Select.Option>

                    {events?.records?.map((event) => (
                      <Select.Option key={event?.message} value={event?.message}>
                        {event?.message}
                      </Select.Option>
                    ))}
                  </Select>,
                ]}
              >
                <Timeline event={event} onClick={onNavigateToHistorical} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </OverviewContainer>
  );
}
