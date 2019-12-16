import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Badge, Icon, Tooltip } from 'antd';
import logo from './img.png';
import './tank.css';

const config = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },

  layout: {
    padding: {
      left: 45,
      right: 0,
      top: 50,
      bottom: 5,
    },
  },
  tooltips: {
    enabled: false,
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
          display: false,
        },
      },
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
          },
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

const Tank = ({ tank, handleClick }) => {
  const { hh, h, l, ll, userH, userL } = tank.levels;

  const errors = Object.values(tank.levels).includes('processing');

  return (
    <div
      className="tank-widget"
      style={{ backgroundColor: errors ? 'rgba(236,110,104, 0.3)' : tank.color }}
      onClick={() => handleClick(tank)}
    >
      <div className="tank-name">
        {tank.code} / {tank.title}
      </div>

      <div className="tank-status">{tank.status}</div>

      <div className="tank-base">{tank.name}</div>

      <div className="tank-svg">
        <img src={logo} alt="Logo" />
      </div>

      <div className="tank-badge">
        <Badge status={hh} text="HH" />
        <Badge status={h} text="H" />
        <Badge status={l} text="L" />
        <Badge status={ll} text="LL" />
        <Badge status={userH} text="User H" />
        <Badge status={userL} text="User L" />
      </div>

      <div className="tank-bar">
        <Bar height={210} data={tank.payload} options={config} />
      </div>

      <div className="tank-auto">
        <Tooltip title={tank.automatic ? 'Gauging Method: Automatic' : 'Gauaging Method: Manual'}>
          <Icon type="sync" spin={tank.automatic} />
        </Tooltip>
      </div>

      <div className="tank-volume">{tank.percent} %</div>
    </div>
  );
};

export default Tank;
