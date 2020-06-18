import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DataTable } from '../../components';
import columns from './columns';

import Forms from './forms';
import TemperatureRender from './temperature-render';

const Table = ({ data, access, visible, setVisible, selected, setSelected, config }) => {
  const { t } = useTranslation();

  const fields = columns(t);
  const [filterValue, setFilterValue] = useState('');

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
        autoColWidth
        filterValue={filterValue}
      />

      <Forms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        setFilterValue={setFilterValue}
        config={config}
      />
    </>
  );
};

export default Table;
