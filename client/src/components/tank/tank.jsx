import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Badge, Icon, Tooltip } from 'antd';

import { ReactComponent } from '../../assets/tank.svg';
import './tank.css';

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
      bottom: 5
    }
  },
  tooltips: {
    enabled: false
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

const Tank = ({ tank, handleClick }) => {
  const { hh, h, l, ll } = tank.levels;

  const errors = Object.values(tank.levels).includes('processing');

  return (
    <div
      className="tank-widget"
      style={{ backgroundColor: errors ? 'rgba(236,110,104, 0.3)' : tank.color }}
    >
      <div className="tank-auto">
        <Tooltip title={tank.automatic ? 'Gauging Method: Automatic' : 'Gauaging Method: Manual'}>
          <Icon type="sync" spin={tank.automatic} />
        </Tooltip>
      </div>

      <div className="tank-name">
        {tank.code} / {tank.title}
      </div>
      <div className="tank-status">{tank.status}</div>
      <div className="tank-base">{tank.name}</div>
      <div className="tank-volume">{tank.level} mm</div>

      <div className="tank-badge">
        <Badge status={hh} text="HH" />
        <Badge status={h} text="H" />
        <Badge status={l} text="L" />
        <Badge status={ll} text="LL" />
      </div>

      <div className="tank-svg">
        <ReactComponent />
      </div>

      <div className="tank-bar" onClick={() => handleClick(tank)}>
        <Bar height={210} width={400} data={tank.payload} options={config} />
      </div>
    </div>
  );
};

export default Tank;
