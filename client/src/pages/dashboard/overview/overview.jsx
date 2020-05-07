import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { Chart } from '../../../components';
import { DASHBOARD } from '../../../api';

const Overview = () => {
  const { t } = useTranslation();
  const { data: payload } = useSWR(DASHBOARD.OVERVIEW);

  const [weekly, setWeekly] = useState({});

  const data = payload?.records[0] || {};

  const isLoading = !payload;

  const colors = ['#0054a4', '#f79043', '#edc3b2', '#24b55e', '#f94646'];

  const throughput = () => {};

  const storage = () => {
    const set = [];

    _.forEach(data?.storage, (store, index) => {
      const payload = {
        label: store.tank_base,
        data: [store.sum_amb],
        backgroundColor: colors[index],
        hoverBackgroundColor: colors[index],
        hoverBorderColor: colors[index],
      };

      set.push(payload);
    });

    return {
      labels: ['Product'],
      datasets: set,
    };
  };

  const folio = () => {
    const set = [];

    _.forEach(data?.folio_throughput, (store, index) => {
      const payload = {
        label: store.tank_base,
        data: [store.sum_amb],
        backgroundColor: colors[index],
        hoverBackgroundColor: colors[index],
        hoverBorderColor: colors[index],
      };

      set.push(payload);
    });

    return {
      labels: ['Product'],
      datasets: set,
    };
  };

  useEffect(() => {
    const payload = [];

    const weeks = _.uniq(_.map(data?.weekly_throughput, 'wk'));

    _.forEach(weeks, (week) => {
      const byWeek = _.filter(data?.weekly_throughput, ['wk', week]);
      const instance = {};

      _.forEach(byWeek, (entry) => {
        instance[entry.trsf_base_p] = entry.qty_amb;
      });

      console.log(instance);
      payload.push({
        label: Object.keys(instance),
        data: Object.values(instance),
      });
    });

    setWeekly({
      labels: weeks,
      datasets: payload,
    });
  }, [data]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Daily Throughput Totals (m3)" hoverable size="small">
            <Chart type="bar" height={100} data={throughput()} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Product Storage (m3)" hoverable size="small">
            <Chart type="bar" height={100} data={storage()} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Current Folio Throughput (m3)" hoverable size="small">
            <Chart type="bar" height={100} data={folio()} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Weekly Throughput (m3)" hoverable size="small">
            <Chart type="line" height={100} data={weekly} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Overview;
