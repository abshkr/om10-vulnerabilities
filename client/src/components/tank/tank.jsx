import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Badge } from 'antd';

import { ReactComponent } from '../../assets/tank.svg';
import './tank.css';

const data = {
  labels: ['Tank'],
  datasets: [
    {
      label: 'Quantity',
      backgroundColor: 'rgba(205,214,172,1)',
      borderColor: 'rgba(105,105,105,0.9)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(205,214,172,0.9)',
      hoverBorderColor: 'rgba(105,105,105,1)',
      data: [80]
    },
    {
      label: 'Ullage',
      backgroundColor: 'rgba(105,105,105,0.7)',
      borderColor: 'rgba(105,105,105,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(105,105,105,0.7)',
      hoverBorderColor: 'rgba(105,105,105,1)',
      data: [20]
    }
  ]
};

const config = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },

  layout: {
    padding: {
      left: 45,
      right: 0,
      top: 50,
      bottom: 10
    }
  },

  scales: {
    xAxes: [
      {
        stacked: true,
        barThickness: 'flex',
        display: false,
        categoryPercentage: 0.9,
        barPercentage: 0.9,
        gridLines: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        stacked: true,
        position: 'right',
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100,
          stepSize: 100,
          callback: (value, index, values) => {
            return `${value}%`;
          }
        },
        gridLines: {
          display: false
        }
      }
    ]
  }
};

const Tank = () => {
  return (
    <div className="tank-widget">
      <div className="svg">
        <ReactComponent />
      </div>
      <div className="bar">
        <Bar height={210} width={400} data={data} options={config} />
      </div>
      <div className="tank-badge">
        <Badge status="processing" text="HH" />
        <Badge status="default" text="H" />
        <Badge status="default" text="L" />
        <Badge status="default" text="LL" />
      </div>
    </div>
  );
};

export default Tank;
