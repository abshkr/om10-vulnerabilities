import React from 'react';
import ReactApexChart from 'react-apexcharts';

const series = [
  {
    name: 'Critical',
    data: [44, 55, 41, 37, 22, 43, 21],
  },
  {
    name: 'Error',
    data: [53, 32, 33, 52, 13, 43, 32],
  },
  {
    name: 'Event',
    data: [12, 17, 11, 9, 15, 11, 20],
  },
  {
    name: 'Incident',
    data: [9, 7, 5, 8, 6, 9, 4],
  },
  {
    name: 'Major',
    data: [25, 12, 19, 32, 25, 24, 10],
  },

  {
    name: 'Minor',
    data: [25, 12, 19, 32, 25, 24, 10],
  },

  {
    name: 'Warning',
    data: [25, 12, 19, 32, 25, 24, 10],
  },
];

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

const Events = () => {
  return <ReactApexChart options={options} series={series} type="bar" height={200} />;
};

export default Events;
