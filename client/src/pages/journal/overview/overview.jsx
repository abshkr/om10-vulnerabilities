import React, { useState } from 'react';
import { Row, Col, Card, Select, Statistic } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import moment from 'dayjs';

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

  function onNavigateToHistorical(start, end, messageEvent = undefined) {
    const startIndex = start;
    const endIndex = end || moment().format(DATE_TIME_FORMAT);

    console.log('...............', start, end, messageEvent, startIndex, endIndex);
    doSearch({
      end_date: endIndex,
      msg_class: undefined,
      msg_event: messageEvent,
      start_date: startIndex,
      target_str: undefined,
      use_date_range: true, //undefined,
    });

    // setRange(startIndex, endIndex);

    setTab('2');
  }

  return (
    <OverviewContainer>
      <Row>
        <Col span={16}>
          <Row gutter={[10, 10]}>
            <Col span={8}>
              <Card className="statistic" size="small" loading={isInitialLoading}>
                <Statistic
                  title={t('fields.journal24h')}
                  value={overview?.day}
                  suffix={t('fields.journalEntry')}
                />
              </Card>
            </Col>

            <Col span={8}>
              <Card className="statistic" size="small" loading={isInitialLoading}>
                <Statistic
                  title={t('fields.journal7d')}
                  value={overview?.week}
                  suffix={t('fields.journalEntry')}
                />
              </Card>
            </Col>

            <Col span={8} style={{ paddingRight: 15 }}>
              <Card className="statistic" size="small" loading={isInitialLoading}>
                <Statistic
                  title={t('fields.journal30d')}
                  value={overview?.month}
                  suffix={t('fields.journalEntry')}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col span={24} style={{ paddingRight: 15 }}>
              <Card title={t('fields.journalEventsByWeek')} size="small">
                <Events data={overview?.catetories} />
              </Card>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col span={24} style={{ paddingRight: 15 }}>
              <Card title={t('fields.journalHeatmap')} size="small">
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
                  title={t('fields.journalEventsByWeek')}
                  value={overview?.today}
                  suffix={
                    <div>
                      <a onClick={() => onNavigateToHistorical(startOfToday, endOfToday, 'ALARM')}>
                        {t('fields.journalAlarmsToday')}
                      </a>{' '}
                      /{' '}
                      <a onClick={() => onNavigateToHistorical(startOfYesterday, endOfYesterday, 'ALARM')}>
                        {t('fields.journalAlarmsYsd')} ({overview?.yesterday})
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
                style={{ height: 618 }}
                bodyStyle={{ overflowY: 'scroll', maxHeight: 580 }}
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
