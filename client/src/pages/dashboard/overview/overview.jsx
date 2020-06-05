import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Select, Radio } from 'antd';

import ReactApexChart from 'react-apexcharts';
import useSWR from 'swr';
import _ from 'lodash';

import { DASHBOARD } from '../../../api';

const Overview = () => {
  const { data: payload } = useSWR(DASHBOARD.OVERVIEW);

  const [dailySeries, setDailySeries] = useState([]);
  const [dailyOptions, setDailyOptions] = useState({});

  const [weeklySeries, setWeeklySeries] = useState([]);
  const [weeklyOptions, setWeeklyOptions] = useState({});

  const [weeklyMode, setWeeklyMode] = useState('linear');

  const [storageSeries, setStorageSeries] = useState([]);
  const [storageOptions, setStorageOptions] = useState({});
  const [storageClass, setStorageClass] = useState('All');
  const [storageTypes, setStorageTypes] = useState([]);

  const [folioSeries, setFolioSeries] = useState([]);
  const [folioOptions, setFolioOptions] = useState({});

  const [folioClass, setFolioClass] = useState('All');
  const [folioTypes, setFolioTypes] = useState([]);

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
            points.push(null);
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

        yaxis: {
          logarithmic: weeklyMode === 'log',
        },

        legend: {
          position: 'right',
        },

        labels: dates,
      };

      setWeeklySeries(series);
      setWeeklyOptions(options);
    }
  }, [payload, weeklyMode]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];

    if (entry?.storage) {
      const baseClasses = _.uniq(_.map(entry?.storage, 'bclass_desc'));

      setStorageTypes(['All', ...baseClasses]);
    }
  }, [payload]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];

    if (entry?.storage && storageClass) {
      const payload = [];

      for (let index = 0; index < entry?.storage.length; index++) {
        const base = entry?.storage[index];

        if (storageClass === 'All') {
          payload.push({
            name: base.base_name,
            data: [_.toNumber(base.qty_cor)],
          });
        }

        if (base.bclass_desc === storageClass) {
          payload.push({
            name: base.base_name,
            data: [_.toNumber(base.qty_cor)],
          });
        }
      }

      const options = {
        chart: {
          zoom: {
            enabled: false,
          },
        },

        plotOptions: {
          bar: {
            columnWidth: '100%',
          },
        },
        dataLabels: {
          enabled: false,
        },

        legend: {
          show: true,
          position: 'right',

          markers: {
            radius: 12,
          },
        },

        xaxis: {
          categories: ['Products'],

          labels: {
            show: false,
          },
        },
      };

      setStorageOptions(options);
      setStorageSeries(payload);
    }
  }, [payload, storageClass]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];

    if (entry?.folio_throughput) {
      const baseClasses = _.uniq(_.map(entry?.folio_throughput, 'bclass_desc'));

      setFolioTypes(['All', ...baseClasses]);
    }
  }, [payload]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];

    if (entry?.folio_throughput) {
      const payload = [];

      for (let index = 0; index < entry?.folio_throughput.length; index++) {
        const base = entry?.folio_throughput[index];

        if (folioClass === 'All') {
          payload.push({
            name: base.base_name,
            data: [_.toNumber(base.qty_cor)],
          });
        }

        if (base.bclass_desc === folioClass) {
          payload.push({
            name: base.base_name,
            data: [_.toNumber(base.qty_cor)],
          });
        }
      }

      const options = {
        chart: {
          zoom: {
            enabled: false,
          },
        },

        plotOptions: {
          bar: {
            columnWidth: '100%',
          },
        },
        dataLabels: {
          enabled: false,
        },

        legend: {
          show: true,
          position: 'right',

          markers: {
            radius: 12,
          },
        },

        xaxis: {
          categories: ['Products'],

          labels: {
            show: false,
          },
        },
      };

      setFolioOptions(options);
      setFolioSeries(payload);
    }
  }, [payload]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];

    if (entry?.throughput) {
      const payload = {};

      for (let index = 0; index < entry?.throughput.length; index++) {
        const base = entry?.throughput[index];

        payload[base.dmy] = _.toNumber(base.qty_cor);
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

      setDailyOptions(options);
      setDailySeries(series);
    }
  }, [payload]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Daily Throughput Totals (m3)" hoverable size="small" loading={!payload}>
            <ReactApexChart options={dailyOptions} series={dailySeries} type="line" height={300} />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title="Base Product Storage (m3)"
            hoverable
            size="small"
            loading={!payload}
            extra={
              <Select
                value={storageClass}
                style={{ width: 250 }}
                loading={!payload}
                onChange={(value) => setStorageClass(value)}
              >
                {storageTypes.map((item) => (
                  <Select.Option value={item} key={item}>
                    {`${item !== 'All' ? 'Class: ' : ''} ${item}`}
                  </Select.Option>
                ))}
              </Select>
            }
          >
            <ReactApexChart options={storageOptions} series={storageSeries} type="bar" height={300} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            title="Current Folio Throughput (m3)"
            hoverable
            size="small"
            loading={!payload}
            extra={
              <Select
                value={folioClass}
                style={{ width: 250 }}
                loading={!payload}
                onChange={(value) => setFolioClass(value)}
              >
                {folioTypes.map((item) => (
                  <Select.Option value={item} key={item}>
                    {`${item !== 'All' ? 'Class: ' : ''} ${item}`}
                  </Select.Option>
                ))}
              </Select>
            }
          >
            <ReactApexChart options={folioOptions} series={folioSeries} type="bar" height={300} />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title="Weekly Throughput (m3)"
            hoverable
            size="small"
            loading={!payload}
            extra={
              <Radio.Group
                defaultValue={weeklyMode}
                buttonStyle="solid"
                onChange={(event) => setWeeklyMode(event.target.value)}
              >
                <Radio.Button value="linear">Linear</Radio.Button>
                <Radio.Button value="log">Logarithmic</Radio.Button>
              </Radio.Group>
            }
          >
            <ReactApexChart options={weeklyOptions} series={weeklySeries} type="line" height={300} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Overview;
