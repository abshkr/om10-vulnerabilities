import React from 'react';

import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import useSWR from 'swr';

import { Page, DataTable, Download, FormModal } from '../../components';
import { CUSTOMER_CATEGORIES } from '../../api';

import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const CustomerCategories = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(CUSTOMER_CATEGORIES.READ);

  const fields = columns(t);

  const handleClick = value => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: 'test',
      name: 'test',
      t
    });
  };

  const modifiers = (
    <>
      <Button icon="sync" onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
      <Button type="primary" icon="plus" onClick={() => handleClick(null)} loading={isValidating}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.customers')} name={t('pageNames.customerCategories')} modifiers={modifiers}>
      <DataTable columns={fields} data={payload?.records} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(CustomerCategories);
