import React from 'react';
import ReactApexChart from 'react-apexcharts';

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generate() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const payload = [];

  for (let month = 0; month < months.length; month++) {
    const data = [];

    for (let day = 0; day < 30; day++) {
      data.push({
        x: day,
        y: random(1, 100),
      });
    }

    payload.push({
      name: months[month],
      data,
    });
  }

  return payload;
}

const series = generate();

const options = {
  chart: {
    height: 350,
    type: 'heatmap',
    toolbar: {
      show: false,
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
            to: 5,
            name: 'low',
            color: '#00A100',
          },
          {
            from: 6,
            to: 20,
            name: 'medium',
            color: '#128FD9',
          },
          {
            from: 21,
            to: 45,
            name: 'high',
            color: '#FFB200',
          },
          {
            from: 46,
            to: 99999999,
            name: 'extreme',
            color: '#FF0000',
          },
        ],
      },
    },
  },
};

const Heatmap = () => {
  return <ReactApexChart options={options} series={series} type="heatmap" height={290} />;
};

export default Heatmap;
