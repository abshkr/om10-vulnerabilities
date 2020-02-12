import React from 'react';
import General from './general';
import Generic from './generic';

const Menu = ({ title, form, value, options, nodes }) => {
  switch (title) {
    case 'general':
      return <General form={form} value={value} options={options} nodes={nodes} />;

    default:
      return <Generic form={form} value={value} options={options} nodes={nodes} />;
  }
};

export default Menu;
