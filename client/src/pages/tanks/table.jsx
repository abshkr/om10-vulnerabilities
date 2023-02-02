import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PowerTable as DataTable } from '../../components';
import columns from './columns';

import Forms from './forms';
import TemperatureRender from './temperature-render';

const Table = ({ data, access, visible, setVisible, selected, setSelected, config, isLoading }) => {
  const { t } = useTranslation();

  const fields = columns(t, config);
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
        isLoading={isLoading}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        components={{
          TemperatureRender: TemperatureRender,
        }}
        autoColWidth
        filterValue={filterValue}
        columnAdjustable={config?.siteCustomColumnTankStatus}
        pageModule={'M_TANKSTATUS'}
      />

      <Forms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        setFilterValue={setFilterValue}
        config={config}
        tanks={data}
      />
    </>
  );
};

export default Table;
