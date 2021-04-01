import React from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  legend: {
    position: 'bottom',

    markers: {
      radius: 2,
    },
  },
  chart: {
    toolbar: {
      show: false,
    },
  },

  labels: ['Yesterday', 'Today'],
};

const YesterdayVsToday = ({ yesterday, today }) => {
  return <ReactApexChart options={options} series={[yesterday, today]} type="donut" height={337} />;
};

export default YesterdayVsToday;
