import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { ORDER_LISTINGS } from '../../api';
import columns from './columns';
import auth from '../../auth';

const OrderListings = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(ORDER_LISTINGS.READ);

  const fields = columns(t);
  const data = payload?.records;

  const handleClick = (value) => {
    FormModal({
      value,
      form: <div value={value} />,
      id: value?.bacl_bay_code,
      name: value?.bacl_bay_type_name,
      t,
    });
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => handleClick(null)} loading={isValidating}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.customers')} name={t('pageNames.orderListing')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(OrderListings);
