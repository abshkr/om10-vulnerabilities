import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { groupBy, toNumber } from 'lodash';

import useConfig from 'hooks/use-config';

const Heatmap = ({ data, onClick }) => {
  const {
    heatmapAverageFrom,
    heatmapAverageTo,
    heatmapHighFrom,
    heatmapHighTo,
    heatmapExtremeFrom,
    heatmapExtremeTo,
  } = useConfig();

  const [series, setSeries] = useState([]);
  const [selected, setSelected] = useState(null);

  const low = heatmapAverageFrom >= 9999999 ? 'Low (Not Set)' : `Low (${0} - ${heatmapAverageFrom})`;

  const average =
    heatmapAverageFrom >= 9999999 || heatmapAverageTo >= 9999999
      ? 'Average (Not Set)'
      : `Average (${heatmapAverageFrom} - ${heatmapAverageTo})`;

  const high =
    heatmapHighFrom >= 9999999 || heatmapHighTo >= 9999999
      ? 'High (Not Set)'
      : `High (${heatmapHighFrom} - ${heatmapHighTo})`;

  const extreme =
    heatmapExtremeFrom >= 9999999 || heatmapExtremeTo >= 9999999
      ? 'Extreme (Not Set)'
      : `Extreme (${heatmapExtremeFrom} - ${heatmapExtremeTo})`;

  const options = {
    chart: {
      height: 350,
      type: 'heatmap',
      toolbar: {
        show: false,
      },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const x = toNumber(event.target.attributes['i'].value);
          const y = toNumber(event.target.attributes['j'].value);

          setSelected({ x, y });
        },
      },
    },

    legend: {
      position: 'bottom',

      markers: {
        radius: 2,
      },
    },

    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: heatmapAverageFrom,
              name: low,
              color: '#00A100',
            },
            {
              from: heatmapAverageFrom,
              to: heatmapAverageTo,
              name: average,
              color: '#128FD9',
            },
            {
              from: heatmapHighFrom,
              to: heatmapHighTo,
              name: high,
              color: '#FFB200',
            },
            {
              from: heatmapExtremeFrom,
              to: heatmapExtremeTo,
              name: extreme,
              color: '#FF0000',
            },
          ],
        },
      },
    },
  };

  useEffect(() => {
    const node = series[selected?.x]?.data[selected?.y];

    if (node?.date) {
      onClick(`${node?.date} 00:00:00`, `${node?.date} 23:59:59`, 'ALARM');
    }
  }, [selected]);

  useEffect(() => {
    if (data) {
      const payload = [];

      const grouped = groupBy(data, 'month');
      const months = Object.keys(grouped);

      for (let index = 0; index < months.length; index++) {
        const month = months[index];
        const points = [];

        const node = grouped[month];

        for (let index = 0; index < 31; index++) {
          const day = index + 1;

          const item = node.find((element) => toNumber(element?.day) === day);

          const value = item?.records || 0;

          points.push({
            x: String(day),
            y: value,
            date: item?.formated_date,
          });
        }

        payload.push({
          name: month,
          data: points,
        });
      }

      setSeries(payload);
    }
  }, [data]);

  return <ReactApexChart options={options} series={series} type="heatmap" height={250} />;
};

export default Heatmap;
