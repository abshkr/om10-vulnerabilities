import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Badge } from 'antd';
import { UserHLevel, UserLLevel, MaxLevel } from '../../../pages/tank-configuration/forms/fields';

import logo from './img.png';

const config = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },

  layout: {
    padding: {
      left: 75,
      right: 75,
      top: 50,
      bottom: 10,
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
  const { hh, h, l, ll, userL, userH } = tank.levels;

  return (
    <div className="tank-form">
      <div className="tank-context">
        <img src={logo} className="tank-form-tank" alt="Logo" />

        <div className="tank-form-bar">
          <Bar height={210} data={tank.payload} options={config} />
        </div>
      </div>

      <div className="tank-form-status">
        <Badge status={hh} text="HH" />
        <Badge status={h} text="H" />
        <Badge status={l} text="L" />
        <Badge status={ll} text="LL" />
        <Badge status={userH} text="User H" />
        <Badge status={userL} text="User L" />
      </div>

      <div className="tank-input">
        <MaxLevel form={form} value={value} />
        <UserHLevel form={form} value={value} />
        <UserLLevel form={form} value={value} />
      </div>
    </div>
  );
};

export default TankForm;
