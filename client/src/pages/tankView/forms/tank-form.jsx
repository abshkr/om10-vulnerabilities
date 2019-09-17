import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Badge } from 'antd';

import { ReactComponent } from '../../../assets/tank.svg';

import { UserLLevel, UserHLevel } from '../../tankConfiguration/forms/fields';

const config = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },

  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 75,
      bottom: 15
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
        categoryPercentage: 1,
        barPercentage: 1,
        gridLines: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        stacked: true,
        position: 'right',
        display: false,

        gridLines: {
          display: false
        }
      }
    ]
  }
};

const TankForm = ({ tank, handleClick, decorator, value, setValue, data }) => {
  const { hh, h, l, ll } = tank.levels;

  const errors = Object.values(tank.levels).includes('processing');

  return (
    <div
      className="big-tank-widget"
      style={{ backgroundColor: errors ? 'rgba(236,110,104, 0.3)' : tank.color }}
    >
      <div className="tank-form-level">
        <UserHLevel decorator={decorator} value={value} setValue={setValue} data={data} />
        <UserLLevel decorator={decorator} value={value} setValue={setValue} data={data} />
      </div>
      <div className="tank-form-status">
        <Badge status={hh} text="HH" />
        <Badge status={h} text="H" />
        <Badge status={l} text="L" />
        <Badge status={ll} text="LL" />
      </div>

      <div>
        <ReactComponent class="scaling-svg" />
      </div>

      <div className="tank-form-bar">
        <Bar data={tank.payload} options={config} />
      </div>
    </div>
  );
};

export default TankForm;
