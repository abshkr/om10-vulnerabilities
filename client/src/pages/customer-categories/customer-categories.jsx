import React, { useState } from 'react';

import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import useSWR from 'swr';

import { Page, DataTable, Download } from '../../components';
import { CUSTOMER_CATEGORIES } from '../../api';

import columns from './columns';
import auth from '../../auth';
import { useAuth } from '../../hooks';
import Forms from './forms';

const CustomerCategories = () => {
  const { t } = useTranslation();

  const access = useAuth('M_CUSTOMERCATEGORIES');

  const { data: payload, isValidating, revalidate } = useSWR(CUSTOMER_CATEGORIES.READ);

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const page = t('pageMenu.companies');
  const name = t('pageNames.customerCategories');

  const fields = columns(t);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isValidating}
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} avatar="customerCategories">
      <DataTable
        columns={fields}
        data={payload?.records}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        selectionMode="single"
      />
      <Forms value={selected} visible={visible} handleFormState={handleFormState} access={access} />
    </Page>
  );
};

export default auth(CustomerCategories);
