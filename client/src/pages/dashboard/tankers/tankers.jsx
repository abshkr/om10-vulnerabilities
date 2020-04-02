import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import config from './config';

const data = {
  labels: ['Total', 'Active'],
  datasets: [
    {
      data: [798, 500],
      backgroundColor: ['#4164e3', '#e2eefb'],
      hoverBackgroundColor: ['#688eec', '#e2eefb'],
      hoverBorderColor: ['#688eec', '#e2eefb']
    }
  ]
};

const Tankers = () => {
  return <Doughnut data={data} options={config} height={130} />;
};

export default Tankers;
