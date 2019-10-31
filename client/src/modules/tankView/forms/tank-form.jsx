import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Badge } from 'antd';
import logo from './img.png';
import { UserLLevel, UserHLevel } from '../../../pages/tankConfiguration/forms/fields';

const config = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },

  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 75,
      bottom: 15,
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
        categoryPercentage: 1,
        barPercentage: 1,
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        position: 'right',
        display: false,

        gridLines: {
          display: false,
        },
      },
    ],
  },
};

const TankForm = ({ tank, handleClick, form, value, data }) => {
  const { hh, h, l, ll } = tank.levels;

  const errors = Object.values(tank.levels).includes('processing');

  return (
    <div
      className="big-tank-widget"
      style={{ backgroundColor: errors ? 'rgba(236,110,104, 0.3)' : tank.color }}
    >
      <div className="tank-form-status">
        <Badge status={hh} text="HH" />
        <Badge status={h} text="H" />
        <Badge status={l} text="L" />
        <Badge status={ll} text="LL" />
      </div>

      <div className="tank-form-h-level">
        <UserHLevel form={form} value={value} data={data} />
      </div>

      <div className="tank-form-l-level">
        <UserLLevel form={form} value={value} data={data} />
      </div>

      <div className="tank-img">
        <img src={logo} alt="Logo" />
      </div>

      <div className="tank-form-bar">
        <Bar height={230} data={tank.payload} options={config} />
      </div>
    </div>
  );
};

export default TankForm;
