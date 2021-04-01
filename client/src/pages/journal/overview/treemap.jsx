import React from 'react';
import ReactApexChart from 'react-apexcharts';

const series = [
  {
    data: [
      {
        x: 'Tank A7',
        y: 218,
      },
      {
        x: 'Folio Tank A6',
        y: 149,
      },
      {
        x: 'Personnel MF890',
        y: 184,
      },
      {
        x: 'Folio Tank A8',
        y: 55,
      },
      {
        x: 'Personnel K-Love',
        y: 84,
      },
      {
        x: 'Bay 011',
        y: 31,
      },
      {
        x: 'User 38',
        y: 70,
      },
    ],
  },
];

const options = {
  legend: {
    show: false,
  },

  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
    },
    formatter: function (text, op) {
      return [text, op.value];
    },
    offsetY: -4,
  },

  chart: {
    height: 350,
    type: 'treemap',
    toolbar: {
      show: false,
    },
  },
};

const Treemap = () => {
  return <ReactApexChart options={options} series={series} type="treemap" height={275} />;
};

export default Treemap;
