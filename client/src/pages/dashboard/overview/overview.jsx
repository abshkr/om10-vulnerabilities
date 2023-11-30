import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Card, Col, Row, Select, Radio } from 'antd';
import { useTranslation } from 'react-i18next';

import Chart from 'react-apexcharts';
import useSWR from 'swr';
import _ from 'lodash';

import { DASHBOARD, BASE_PRODUCTS } from '../../../api';
import { getRealColor } from '../../../utils';

import locale from './locale';

/*
palette1	#008FFB	#00E396	#FEB019	#FF4560	#775DD0
palette2	#3F51B5	#03A9F4	#4CAF50	#F9CE1D	#FF9800
palette3	#33B2DF	#546E7A	#D4526E	#13D8AA	#A5978B
palette4	#4ECDC4	#C7F464	#81D4FA	#546E7A	#FD6A6A
palette5	#2B908F	#F9A3A4	#90EE7E	#FA4443	#69D2E7
palette6	#449DD1	#F86624	#EA3546	#662E9B	#C5D86D
palette7	#D7263D	#1B998B	#2E294E	#F46036	#E2C044
palette8	#662E9B	#F86624	#F9C80E	#EA3546	#43BCCD
palette9	#5C4742	#A5978B	#8D5B4C	#5A2A27	#C4BBAF
palette10	#A300D6	#7D02EB	#5653FE	#2983FF	#00B1F2

[
'#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', 
'#3F51B5', '#03A9F4', '#4CAF50', '#F9CE1D', '#FF9800', 
'#33B2DF', '#546E7A', '#D4526E', '#13D8AA', '#A5978B', 
'#4ECDC4', '#C7F464', '#81D4FA', '#546E7A', '#FD6A6A', 
'#2B908F', '#F9A3A4', '#90EE7E', '#FA4443', '#69D2E7', 
'#449DD1', '#F86624', '#EA3546', '#662E9B', '#C5D86D', 
'#D7263D', '#1B998B', '#2E294E', '#F46036', '#E2C044', 
'#662E9B', '#F86624', '#F9C80E', '#EA3546', '#43BCCD', 
'#5C4742', '#A5978B', '#8D5B4C', '#5A2A27', '#C4BBAF', 
'#A300D6', '#7D02EB', '#5653FE', '#2983FF', '#00B1F2'
]; 
*/

/*
yaxis: {
      show: true,
      showAlways: true,
      showForNullSeries: true,
      seriesName: undefined,
      opposite: false,
      reversed: false,
      logarithmic: false,
      logBase: 10,
      tickAmount: 6,
      min: 6,
      max: 6,
      forceNiceScale: false,
      floating: false,
      decimalsInFloat: undefined,
      labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
              colors: [],
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
          formatter: (value) => { return val },
      },
      axisBorder: {
          show: true,
          color: '#78909C',
          offsetX: 0,
          offsetY: 0
      },
      axisTicks: {
          show: true,
          borderType: 'solid',
          color: '#78909C',
          width: 6,
          offsetX: 0,
          offsetY: 0
      },
      title: {
          text: undefined,
          rotate: -90,
          offsetX: 0,
          offsetY: 0,
          style: {
              color: undefined,
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-title',
          },
      },
      crosshairs: {
          show: true,
          position: 'back',
          stroke: {
              color: '#b6b6b6',
              width: 1,
              dashArray: 0,
          },
      },
      tooltip: {
          enabled: true,
          offsetX: 0,
      },
      
  }
  
*/

const Overview = ({ baseFlag, payloadBases }) => {
  const { t, i18n } = useTranslation();

  const txtAll = t('fields.all');
  const defaultColors = [
    '#008FFB',
    '#00E396',
    '#FEB019',
    '#FF4560',
    '#775DD0',
    '#3F51B5',
    '#03A9F4',
    '#4CAF50',
    '#F9CE1D',
    '#FF9800',
    '#33B2DF',
    '#546E7A',
    '#D4526E',
    '#13D8AA',
    '#A5978B',
    '#4ECDC4',
    '#C7F464',
    '#81D4FA',
    '#546E7A',
    '#FD6A6A',
    '#2B908F',
    '#F9A3A4',
    '#90EE7E',
    '#FA4443',
    '#69D2E7',
    '#449DD1',
    '#F86624',
    '#EA3546',
    '#662E9B',
    '#C5D86D',
    '#D7263D',
    '#1B998B',
    '#2E294E',
    '#F46036',
    '#E2C044',
    '#662E9B',
    '#F86624',
    '#F9C80E',
    '#EA3546',
    '#43BCCD',
    '#5C4742',
    '#A5978B',
    '#8D5B4C',
    '#5A2A27',
    '#C4BBAF',
    '#A300D6',
    '#7D02EB',
    '#5653FE',
    '#2983FF',
    '#00B1F2',
  ];

  const { data: payload } = useSWR(DASHBOARD.OVERVIEW);
  // const { data: payloadBases } = useSWR(`${BASE_PRODUCTS.READ}?trigger=${baseFlag}`);

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
  const [storageMode, setStorageMode] = useState('linear');

  const [folioSeries, setFolioSeries] = useState([]);
  const [folioOptions, setFolioOptions] = useState({});

  const [folioClass, setFolioClass] = useState(txtAll);
  const [folioTypes, setFolioTypes] = useState([]);

  const [colorsWeekly, setColorsWeekly] = useState([]);
  const [colorsStorage, setColorsStorage] = useState([]);
  const [colorsFolio, setColorsFolio] = useState([]);

  const adjustBaseColors = (category, payload, payloadBases, flag) => {
    if (!flag) return;
    // colorsStorage - tank_base, bclass_no
    /*
      {
        "qty_abm": "21720.042",
        "qty_cor": "21687.083",
        "tank_base": "400004540",
        "base_name": "GO Best",
        "bclass_no": "4",
        "bclass_desc": "Diesel oils/Fuel oils/Heating oils"
      },
    */
    const entry = payload?.records && payload?.records[0];
    const classStorages = [];
    if (category === txtAll) {
      // legend shows base classifications
      for (let i = 0; i < entry?.storage?.length; i++) {
        const bs = entry?.storage?.[i];
        const item = _.find(
          classStorages,
          (o) => o.bclass_no === bs?.bclass_no && o.bclass_desc === bs?.bclass_desc
        );
        if (!item) {
          const base = _.find(payloadBases?.records, (o) => o.base_code === bs?.tank_base);
          classStorages.push({
            bclass_no: bs?.bclass_no,
            bclass_desc: bs?.bclass_desc,
            qty_cor: _.toNumber(bs?.qty_cor),
            qty_abm: _.toNumber(bs?.qty_abm),
            base_color: !base ? '' : base?.base_color,
          });
        } else {
          for (let j = 0; j < classStorages?.length; j++) {
            if (
              classStorages?.[j]?.bclass_no === bs?.bclass_no &&
              classStorages?.[j]?.bclass_desc === bs?.bclass_desc
            ) {
              classStorages[j].qty_cor += _.toNumber(bs?.qty_cor);
              classStorages[j].qty_abm += _.toNumber(bs?.qty_abm);
              break;
            }
          }
        }
      }
      console.log('..............classStorages', classStorages);
    } else {
      for (let i = 0; i < entry?.storage?.length; i++) {
        const bs = entry?.storage[i];

        if (bs.bclass_desc === category) {
          const item = _.find(
            classStorages,
            (o) => o.tank_base === bs?.tank_base && o.base_name === bs?.base_name
          );
          if (!item) {
            const base = _.find(payloadBases?.records, (o) => o.base_code === bs?.tank_base);
            classStorages.push({
              tank_base: bs?.tank_base,
              base_name: bs?.base_name,
              bclass_no: bs?.bclass_no,
              bclass_desc: bs?.bclass_desc,
              qty_cor: _.toNumber(bs?.qty_cor),
              qty_abm: _.toNumber(bs?.qty_abm),
              base_color: !base ? '' : base?.base_color,
            });
          } else {
            for (let j = 0; j < classStorages?.length; j++) {
              if (
                classStorages?.[j]?.tank_base === bs?.tank_base &&
                classStorages?.[j]?.base_name === bs?.base_name
              ) {
                classStorages[j].qty_cor += _.toNumber(bs?.qty_cor);
                classStorages[j].qty_abm += _.toNumber(bs?.qty_abm);
                break;
              }
            }
          }
        }
      }
    }
    const scolors = [];
    for (let i = 0; i < classStorages?.length; i++) {
      const bs = classStorages?.[i];
      scolors.push(getRealColor(bs?.base_color));
    }
    setColorsStorage(scolors);
    console.log('...............scolors', scolors);
  };

  const adjustFolioColors = (category, payload, payloadBases, flag) => {
    if (!flag) return;
    // colorsFolio - trsf_base_p
    /*
      {
        "qty_amb": "4.578968",
        "qty_cmb": "4.53528",
        "trsf_base_p": "400003052",
        "base_name": "ETOH Denatured",
        "bclass_desc": "Ethanol/Water"
      },
    */
    const entry = payload?.records && payload?.records[0];
    const fcolors = [];
    for (let i = 0; i < entry?.folio_throughput?.length; i++) {
      const bs = entry?.folio_throughput?.[i];
      const item = _.find(
        payloadBases?.records,
        (o) => o.base_code === bs?.trsf_base_p && (category === txtAll || category === bs?.bclass_desc)
      );
      if (!item) {
        // do nothing ?
      } else {
        fcolors.push(getRealColor(item?.base_color));
      }
    }
    setColorsFolio(fcolors);
    console.log('...............fcolors', fcolors);
  };

  const adjustWeeklyColors = (category, payload, payloadBases, flag) => {
    if (!flag) return;
    // colorsWeekly - trsf_base_p
    /*
      {
        "wk": "02",
        "trsf_base_p": "400000916",
        "base_name": "MFO 180",
        "qty_cor": "646.293",
        "qty_amb": "651.374"
      },
    */
    const entry = payload?.records && payload?.records[0];
    const weekThruputs = [];
    for (let i = 0; i < entry?.weekly_throughput?.length; i++) {
      const bs = entry?.weekly_throughput?.[i];
      const item = _.find(
        weekThruputs,
        (o) => o.trsf_base_p === bs?.trsf_base_p && o.base_name === bs?.base_name
      );
      if (!item) {
        weekThruputs.push({
          trsf_base_p: bs?.trsf_base_p,
          base_name: bs?.base_name,
          qty_cor: _.toNumber(bs?.qty_cor),
          qty_amb: _.toNumber(bs?.qty_amb),
        });
      } else {
        for (let j = 0; j < weekThruputs?.length; j++) {
          if (
            weekThruputs?.[j]?.trsf_base_p === bs?.trsf_base_p &&
            weekThruputs?.[j]?.base_name === bs?.base_name
          ) {
            weekThruputs[j].qty_cor += _.toNumber(bs?.qty_cor);
            weekThruputs[j].qty_amb += _.toNumber(bs?.qty_amb);
            break;
          }
        }
      }
    }
    console.log('..............weekThruputs', weekThruputs);
    const wcolors = [];
    for (let i = 0; i < weekThruputs?.length; i++) {
      const bs = weekThruputs?.[i];
      const item = _.find(payloadBases?.records, (o) => o.base_code === bs?.trsf_base_p);
      if (!item) {
        wcolors.push('');
      } else {
        wcolors.push(getRealColor(item?.base_color));
      }
    }
    console.log('...............wcolors', wcolors);
    setColorsWeekly(wcolors);
  };

  useEffect(() => {
    if (!baseFlag) {
      setColorsWeekly(defaultColors);
      setColorsStorage(defaultColors);
      setColorsFolio(defaultColors);
    } else {
      // get base colors
      if (payload && payloadBases) {
        // colorsStorage - tank_base, bclass_no
        adjustBaseColors(txtAll, payload, payloadBases, baseFlag);

        // colorsFolio - trsf_base_p
        adjustFolioColors(txtAll, payload, payloadBases, baseFlag);

        // colorsWeekly - trsf_base_p
        adjustWeeklyColors(txtAll, payload, payloadBases, baseFlag);
      }
    }
  }, [baseFlag, payloadBases, payload]);

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
          showAlways: true,
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
  }, [payload, weeklyMode, weeklyMin, i18n]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];

    if (entry?.storage) {
      const baseClasses = _.uniq(_.map(entry?.storage, 'bclass_desc'));

      setStorageTypes([txtAll, ...baseClasses]);
    }
  }, [payload]);

  useEffect(() => {
    if (baseFlag && storageClass && payload && payloadBases) {
      adjustBaseColors(storageClass, payload, payloadBases, baseFlag);
    }

    const entry = payload?.records && payload?.records[0];

    if (entry?.storage && storageClass) {
      const storagePayload = [];

      if (storageClass === txtAll) {
        const transformed = _.chain(entry?.storage)
          .groupBy((value) => {
            return value?.bclass_desc;
          })
          .mapValues((products) => {
            const value = _.sumBy(products, (product) => {
              return _.toNumber(product?.qty_cor) || 0.000001;
            });

            return value;
          })
          .value();

        Object.keys(transformed).forEach((key) => {
          storagePayload.push({
            name: key,
            type: 'bar',
            data: [
              {
                x: t('fields.baseProdClassDesc'),
                y: transformed[key],
              },
            ],
          });
        });
      }

      for (let index = 0; index < entry?.storage.length; index++) {
        const base = entry?.storage[index];

        if (base.bclass_desc === storageClass) {
          storagePayload.push({
            name: base.base_name,
            type: 'bar',
            data: [
              {
                x: t('fields.baseProduct'),
                y: _.toNumber(base.qty_cor) || 0.000001,
              },
            ],
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

        stroke: {
          width: 0,
        },

        legend: {
          show: true,
          position: 'right',

          markers: {
            radius: 12,
          },
        },

        yaxis: {
          logarithmic: storageMode !== 'linear',
          forceNiceScale: true,
          min: 0.01,
          showAlways: true,
          labels: {
            formatter: function (value, timestamp) {
              return value?.toFixed(2);
            },
          },
        },

        xaxis: {
          categories: [t('fields.baseProduct')],

          labels: {
            show: false,
          },
        },

        tooltip: {
          shared: false,
        },
      };

      setStorageOptions(options);
      setStorageSeries(storagePayload);
    }
  }, [payload, payloadBases, baseFlag, storageMode, storageClass, i18n]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];

    if (entry?.folio_throughput) {
      const baseClasses = _.uniq(_.map(entry?.folio_throughput, 'bclass_desc'));

      setFolioTypes([txtAll, ...baseClasses]);
    }
  }, [payload]);

  useEffect(() => {
    if (baseFlag && folioClass && payload && payloadBases) {
      adjustFolioColors(folioClass, payload, payloadBases, baseFlag);
    }

    const entry = payload?.records && payload?.records[0];

    if (entry?.folio_throughput) {
      const folioPayload = [];

      for (let index = 0; index < entry?.folio_throughput.length; index++) {
        const base = entry?.folio_throughput[index];

        if (folioClass === txtAll) {
          folioPayload.push({
            name: base.base_name,
            data: [_.toNumber(base.qty_cmb)],
          });
        }

        if (base.bclass_desc === folioClass) {
          folioPayload.push({
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
          categories: [t('fields.baseProduct')],

          labels: {
            show: false,
          },
        },
      };

      setFolioOptions(options);
      setFolioSeries(folioPayload);
    }
  }, [payload, payloadBases, baseFlag, folioClass, i18n]);

  useEffect(() => {
    const entry = payload?.records && payload?.records[0];

    if (entry?.throughput) {
      const dailyPayload = {};

      for (let index = 0; index < entry?.throughput.length; index++) {
        const base = entry?.throughput[index];

        dailyPayload[base.dmy] = _.toNumber(base.qty_cor);
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
        labels: Object.keys(dailyPayload),
      };

      const series = [
        {
          name: t('fields.throughput'),
          data: Object.values(dailyPayload),
        },
      ];

      setDailyOptions(options);
      setDailySeries(series);
    }
  }, [payload, i18n]);

  const options = {
    ...locale,
    defaultLocale: i18n.language || 'en',
  };

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
            <Chart
              options={{
                ...dailyOptions,
                chart: {
                  ...dailyOptions.chart,
                  ...options,
                },
              }}
              series={dailySeries}
              type="line"
              height={285}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title={t('pageNames.chartBaseProductStorage') + ' (' + t('units.m3') + ')'}
            hoverable
            size="small"
            loading={!payload}
            extra={
              <>
                <Radio.Group
                  defaultValue={storageMode}
                  buttonStyle="solid"
                  onChange={(event) => setStorageMode(event.target.value)}
                >
                  <Radio.Button value="linear">{t('fields.chartLinear')}</Radio.Button>
                  <Radio.Button value="log">{t('fields.chartLogarithmic')}</Radio.Button>
                </Radio.Group>
                <Select
                  popupMatchSelectWidth={false}
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
              </>
            }
          >
            <Chart
              options={{
                ...storageOptions,
                chart: {
                  ...storageOptions.chart,
                  ...options,
                },
                colors: colorsStorage,
              }}
              series={storageSeries}
              type="line"
              height={285}
            />
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
                popupMatchSelectWidth={false}
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
            <Chart
              options={{
                ...folioOptions,
                chart: {
                  ...folioOptions.chart,
                  ...options,
                },
                colors: colorsFolio,
              }}
              series={folioSeries}
              type="bar"
              height={285}
            />
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
            <Chart
              options={{
                ...weeklyOptions,
                chart: {
                  ...weeklyOptions.chart,
                  ...options,
                },
                colors: colorsWeekly,
              }}
              series={weeklySeries}
              type="line"
              height={285}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
