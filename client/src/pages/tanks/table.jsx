import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DataTable } from '../../components';
import columns from './columns';

import Forms from './forms';
import TemperatureRender from './temperature-render';

const Table = ({ data, access, visible, setVisible, selected, setSelected }) => {
  const { t } = useTranslation();

  
  const fields = columns(t);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  return (
    <>
      <DataTable
        columns={fields}
        data={data}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        components={{
          TemperatureRender: TemperatureRender,
        }}
      />

      <Forms value={selected} visible={visible} handleFormState={handleFormState} access={access} />
    </>
  );
};

export default Table;
