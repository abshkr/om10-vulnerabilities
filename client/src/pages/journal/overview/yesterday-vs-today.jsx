import React from 'react';
import ReactApexChart from 'react-apexcharts';

const YesterdayVsToday = ({ data }) => {
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
      categories: ['Alarms'],
    },
  };

  const series = [
    {
      name: 'Today',
      data: [1],
    },
    {
      name: 'Yesterday',
      data: [3],
    },
  ];

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={310} />
    </div>
  );
};

export default YesterdayVsToday;
