import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import ReactApexChart from 'react-apexcharts';
import useSWR from 'swr';
import _ from 'lodash';

import { Chart } from '../../../components';
import { DASHBOARD } from '../../../api';

const Overview = () => {
  const { t } = useTranslation();
  const { data: payload } = useSWR(DASHBOARD.OVERVIEW);

  const [weeklySeries, setWeeklySeries] = useState([]);
  const [weeklyOptions, setWeeklyOptions] = useState({});

  const [storageSeries, setStorageSeries] = useState([]);
  const [storageOptions, setStorageOptions] = useState({});

  const [folioSeries, setFolioSeries] = useState([]);
  const [folioOptions, setFolioOptions] = useState({});

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];
    const series = [];

    if (entry?.weekly_throughput) {
      const bases = _.uniq(_.map(entry?.weekly_throughput, 'base_name'));
      const dates = _.uniq(_.map(entry?.weekly_throughput, 'wk'));

      for (let index = 0; index < bases.length; index++) {
        const base = bases[index];
        const points = [];

        _.forEach(dates, (date) => {
          const match = _.find(entry?.weekly_throughput, (object) => {
            return object.wk === date && object.base_name === base;
          });

          if (match) {
            points.push(_.toNumber(match.qty_amb));
          } else {
            points.push(0);
          }
        });

        series.push({
          name: base,
          data: points,
        });
      }

      const options = {
        chart: {
          zoom: {
            enabled: false,
          },
        },
        labels: dates,
      };

      setWeeklyOptions(options);
      setWeeklySeries(series);
    }
  }, [payload]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];

    if (entry?.storage) {
      const payload = {};

      for (let index = 0; index < entry?.storage.length; index++) {
        const base = entry?.storage[index];
        payload[base.base_name] = _.toNumber(base.qty_cor);
      }

      const options = {
        chart: {
          zoom: {
            enabled: false,
          },
        },

        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        labels: Object.keys(payload),
      };

      const series = [
        {
          data: Object.values(payload),
        },
      ];

      setStorageOptions(options);
      setStorageSeries(series);
    }
  }, [payload]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];

    if (entry?.folio_throughput) {
      const payload = {};

      for (let index = 0; index < entry?.folio_throughput.length; index++) {
        const base = entry?.folio_throughput[index];
        payload[base.base_name] = _.toNumber(base.qty_cmb);
      }

      const options = {
        chart: {
          zoom: {
            enabled: false,
          },
        },

        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        labels: Object.keys(payload),
      };

      const series = [
        {
          data: Object.values(payload),
        },
      ];

      setFolioOptions(options);
      setFolioSeries(series);
    }
  }, [payload]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Daily Throughput Totals (m3)" hoverable size="small" loading={!payload}>
            <ReactApexChart options={weeklyOptions} series={weeklySeries} type="line" height={300} />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Base Product Storage (m3)" hoverable size="small">
            <ReactApexChart options={storageOptions} series={storageSeries} type="bar" height={300} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Current Folio Throughput (m3)" hoverable size="small">
            <ReactApexChart options={folioOptions} series={folioSeries} type="bar" height={300} />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Weekly Throughput (m3)" hoverable size="small">
            <ReactApexChart options={weeklyOptions} series={weeklySeries} type="line" height={300} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Overview;
