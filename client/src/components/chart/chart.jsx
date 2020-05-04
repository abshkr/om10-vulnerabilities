import React from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import config from './config';

const Chart = ({ type, height, data }) => {
  switch (type) {
    case 'doughnut':
      return <Doughnut data={data} options={config} height={height} />;

    case 'line':
      return <Line data={data} options={config} height={height} />;

    case 'bar':
      return <Bar data={data} options={config} height={height} />;

    default:
      return null;
  }
};

export default Chart;
