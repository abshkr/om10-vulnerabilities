import React from 'react';
import General from './general';

const Menu = ({ title, form, value, options, nodes }) => {
  switch (title) {
    case 'general':
      return <General form={form} value={value} options={options} nodes={nodes} />;

    case 'schedules':
      return <General form={form} value={value} options={options} nodes={nodes} />;

    default:
      return <General form={form} value={value} options={options} nodes={nodes} />;
  }
};

export default Menu;
