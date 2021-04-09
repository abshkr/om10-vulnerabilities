import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { groupBy } from 'lodash';

const Events = ({ data }) => {
  const [series, setSeries] = useState([]);

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    },
  };

  useEffect(() => {
    if (data) {
      const payload = [];

      const grouped = groupBy(data, 'category');
      const types = [
        'EVENT',
        'COMMS',
        'DOC',
        'CONF',
        'SYSTEM',
        'LOAD',
        'DELIVER',
        'FAIL',
        'MOVE',
        'BAY',
        'ALARM',
        'SCHED',
      ];

      for (let index = 0; index < types.length; index++) {
        const values = [];

        const type = types[index];

        const node = grouped[type];

        for (let index = 0; index < options.xaxis.categories.length; index++) {
          const day = options.xaxis.categories[index]?.toLowerCase();

          const item = node?.find((element) => element?.day?.toLowerCase().includes(day));
          const value = item?.records || 0;

          values.push(value);
        }

        payload.push({
          name: type,
          data: values,
        });
      }

      setSeries(payload);
    }
  }, [data]);

  return <ReactApexChart options={options} series={series} type="bar" height={200} />;
};

export default Events;
