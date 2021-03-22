import React from 'react';
import Regular from './regular';
import DragAndDropEnabled from './drag-and-drop-enabled';

const Compartments = ({ form, value, tanker, drawer, supplier, customer, config }) => {
  const IS_DND_ENABLED = config?.siteAllowDragDrop;

  if (IS_DND_ENABLED) {
    return (
      <DragAndDropEnabled
        form={form}
        value={value}
        tanker={tanker}
        drawer={drawer}
        supplier={supplier}
        customer={customer}
        config={config}
      />
    );
  }

  return (
    <Regular
      form={form}
      value={value}
      tanker={tanker}
      drawer={drawer}
      supplier={supplier}
      customer={customer}
      config={config}
    />
  );
};

export default Compartments;
