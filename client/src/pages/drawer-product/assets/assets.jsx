import React, { useState } from 'react';

import useSWR from 'swr';
import { Button, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from 'components';
import { DRAWER_PRODUCTS } from 'api';
import columns from './columns';

import AssetForm from './forms/asset-forms';

const Assets = ({access}) => {
  console.log(access)
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(DRAWER_PRODUCTS.READ);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const fields = columns(t);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  return (
    <div>
      <DataTable
        data={data}
        columns={fields}
        isLoading={isLoading}
        selectionMode="single"
          onClick={(payload) => handleFormState(true, payload)}
          handleSelect={(payload) => handleFormState(true, payload[0])}
        //   autoColWidth
        filterValue={filterValue}
      />
      <AssetForm 
        value={selected} 
        visible={visible} 
        handleFormState={handleFormState} 
        access={access}
        setFilterValue={setFilterValue}
      />
    </div>
  );
};

export default Assets;
