import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { BASE_PRODUCTS } from '../../api';
import { useAuth, useConfig } from '../../hooks';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';

const BaseProducts = () => {
  const { t } = useTranslation();

  const config = useConfig();
  const access = useAuth('M_BASEPRODUCTS');

  const { data: payload, isValidating, revalidate } = useSWR(BASE_PRODUCTS.READ);

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const fields = columns(t, config);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.products');
  const name = t('pageNames.baseProducts');

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isLoading}
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} avatar="baseProducts">
      <DataTable
        data={data}
        columns={fields}
        isLoading={isLoading}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        autoColWidth
      />

      <Forms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        config={config}
      />
    </Page>
  );
};

export default auth(BaseProducts);
