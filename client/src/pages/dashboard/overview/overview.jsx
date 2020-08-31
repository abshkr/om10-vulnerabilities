import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Card, Col, Row, Select, Radio } from 'antd';
import { useTranslation } from 'react-i18next';

import ReactApexChart from 'react-apexcharts';
import useSWR from 'swr';
import _ from 'lodash';

import { DASHBOARD } from '../../../api';

const Overview = () => {
  const { t } = useTranslation();
  const txtAll = t('fields.all');

  const { data: payload } = useSWR(DASHBOARD.OVERVIEW);

  const [dailySeries, setDailySeries] = useState([]);
  const [dailyOptions, setDailyOptions] = useState({});

  const [weeklySeries, setWeeklySeries] = useState([]);
  const [weeklyOptions, setWeeklyOptions] = useState({});
  const [weeklyMin, setWeeklyMin] = useState(0);
  const [weeklyMode, setWeeklyMode] = useState('linear');

  const [storageSeries, setStorageSeries] = useState([]);
  const [storageOptions, setStorageOptions] = useState({});
  const [storageClass, setStorageClass] = useState(txtAll);
  const [storageTypes, setStorageTypes] = useState([]);

  const [folioSeries, setFolioSeries] = useState([]);
  const [folioOptions, setFolioOptions] = useState({});

  const [folioClass, setFolioClass] = useState(txtAll);
  const [folioTypes, setFolioTypes] = useState([]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];
    const series = [];

    if (entry?.weekly_throughput) {
      const bases = _.uniq(_.map(entry?.weekly_throughput, 'base_name'));
      const dates = _.uniq(_.map(entry?.weekly_throughput, 'wk'));
      const quantities = [];

      for (let index = 0; index < bases.length; index++) {
        const base = bases[index];
        const points = [];

        _.forEach(dates, (date) => {
          const match = _.find(entry?.weekly_throughput, (object) => {
            return object.wk === date && object.base_name === base;
          });

          const formatted = _.toNumber(match?.qty_amb) || null;

          let val = formatted === 0 ? 0 : formatted;

          if (val) {
            quantities.push(val);
          }

          points.push(val);
        });

        series.push({
          name: base,
          data: points,
        });
      }

      setWeeklyMin(_.min(quantities));

      setWeeklySeries(series);
    }
  }, [payload]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];

    if (entry?.weekly_throughput) {
      const dates = _.uniq(_.map(entry?.weekly_throughput, 'wk'));

      const options = {
        chart: {
          zoom: {
            enabled: false,
          },
        },

        yaxis: {
          logarithmic: weeklyMode !== 'linear',
          min: weeklyMin,
          forceNiceScale: true,
          labels: {
            formatter: function (value, timestamp) {
              return value?.toFixed(2);
            },
          },
        },

        xaxis: {
          categories: dates,
        },

        legend: {
          position: 'right',
        },
      };
      setWeeklyOptions(options);
    }
  }, [payload, weeklyMode, weeklyMin]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];

    if (entry?.storage) {
      const baseClasses = _.uniq(_.map(entry?.storage, 'bclass_desc'));

      setStorageTypes([txtAll, ...baseClasses]);
    }
  }, [payload]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];

    if (entry?.storage && storageClass) {
      const payload = [];

      if (storageClass === txtAll) {
        const transformed = _.chain(entry?.storage)
          .groupBy((value) => {
            return value?.bclass_desc;
          })
          .mapValues((products) => {
            const value = _.sumBy(products, (product) => {
              return _.toNumber(product?.qty_cor) || 0;
            });

            return value;
          })
          .value();

        Object.keys(transformed).forEach((key) => {
          payload.push({
            name: key,
            data: [transformed[key]],
          });
        });
      }

      for (let index = 0; index < entry?.storage.length; index++) {
        const base = entry?.storage[index];

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

        yaxis: {
          forceNiceScale: true,

          labels: {
            formatter: function (value, timestamp) {
              return value?.toFixed(2);
            },
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

      setFolioTypes([txtAll, ...baseClasses]);
    }
  }, [payload]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];

    if (entry?.folio_throughput) {
      const payload = [];

      for (let index = 0; index < entry?.folio_throughput.length; index++) {
        const base = entry?.folio_throughput[index];

        if (folioClass === txtAll) {
          payload.push({
            name: base.base_name,
            data: [_.toNumber(base.qty_cmb)],
          });
        }

        if (base.bclass_desc === folioClass) {
          payload.push({
            name: base.base_name,
            data: [_.toNumber(base.qty_cmb)],
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

          verticalAlign: 'top',
          containerMargin: {
            left: 35,
            right: 60,
          },

          markers: {
            radius: 12,
          },
        },

        yaxis: {
          forceNiceScale: true,

          labels: {
            formatter: function (value, timestamp) {
              return value?.toFixed(2);
            },
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
  }, [payload, folioClass]);

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

        yaxis: {
          forceNiceScale: true,

          labels: {
            formatter: function (value, timestamp) {
              return value?.toFixed(2);
            },
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
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            title={t('pageNames.chartDailyThroughputTotals') + ' (' + t('units.m3') + ')'}
            hoverable
            size="small"
            loading={!payload}
          >
            <ReactApexChart options={dailyOptions} series={dailySeries} type="line" height={285} />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title={t('pageNames.chartBaseProductStorage') + ' (' + t('units.m3') + ')'}
            hoverable
            size="small"
            loading={!payload}
            extra={
              <Select
                dropdownMatchSelectWidth={false}
                value={storageClass}
                style={{ width: 250 }}
                loading={!payload}
                onChange={(value) => setStorageClass(value)}
              >
                {storageTypes.map((item) => (
                  <Select.Option value={item} key={item}>
                    {`${item !== txtAll ? t('fields.class') + ': ' : ''} ${item}`}
                  </Select.Option>
                ))}
              </Select>
            }
          >
            <ReactApexChart options={storageOptions} series={storageSeries} type="bar" height={285} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            title={t('pageNames.chartCurrentFolioThroughput') + ' (' + t('units.m3') + ')'}
            hoverable
            size="small"
            loading={!payload}
            bodyStyle={{ overflow: 'hidden' }}
            extra={
              <Select
                dropdownMatchSelectWidth={false}
                value={folioClass}
                style={{ width: 250 }}
                loading={!payload}
                onChange={(value) => setFolioClass(value)}
              >
                {folioTypes.map((item) => (
                  <Select.Option value={item} key={item}>
                    {`${item !== txtAll ? t('fields.class') + ': ' : ''} ${item}`}
                  </Select.Option>
                ))}
              </Select>
            }
          >
            <ReactApexChart options={folioOptions} series={folioSeries} type="bar" height={285} />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title={t('pageNames.chartWeeklyThroughput') + ' (' + t('units.m3') + ')'}
            hoverable
            size="small"
            loading={!payload}
            extra={
              <Radio.Group
                defaultValue={weeklyMode}
                buttonStyle="solid"
                onChange={(event) => setWeeklyMode(event.target.value)}
              >
                <Radio.Button value="linear">{t('fields.chartLinear')}</Radio.Button>
                <Radio.Button value="log">{t('fields.chartLogarithmic')}</Radio.Button>
              </Radio.Group>
            }
          >
            <ReactApexChart options={weeklyOptions} series={weeklySeries} type="line" height={285} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
