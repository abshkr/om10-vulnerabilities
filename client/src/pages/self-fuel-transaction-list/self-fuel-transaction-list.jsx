import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { SELF_FUEL_TRANSACTION_LIST } from '../../api';
import columns from './columns';
import auth from '../../auth';
import useAuth from 'hooks/use-auth';

const SelfFuelTransactionList = () => {
  const { t } = useTranslation();

  const access = useAuth('M_SFTRANSACTIONLIST');

  const { data: payload, isValidating, revalidate } = useSWR(SELF_FUEL_TRANSACTION_LIST.READ);

  const data = payload?.records;
  const fields = columns(t);

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isValidating} columns={fields} />
    </>
  );

  return (
    <Page
      page={t('pageMenu.stock')}
      name={t('pageNames.selfFuelTransactionList')}
      modifiers={modifiers}
      access={access}
      avatar="selfFuelTransactionList"
    >
      <DataTable columns={fields} data={data} isLoading={isValidating} />
    </Page>
  );
};

export default auth(SelfFuelTransactionList);
