import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { SyncOutlined } from '@ant-design/icons';
import { Page, DataTable, Download } from '../../components';
import { STOCK_MANAGEMENT } from '../../api';
import columns from './columns';
import auth from '../../auth';

const TankInventory = () => {
  const { t } = useTranslation();
  const { data, revalidate, isValidating } = useSWR(STOCK_MANAGEMENT.TANK_INVENTORY);

  const payload = data?.records;
  const fields = columns(t);

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload} isLoading={isValidating} columns={fields} />
    </>
  );

  return (
    <Page
      page={t('pageMenu.stock')}
      name={t('pageNames.tankInventory')}
      modifiers={modifiers}
      avatar="tankInventory"
    >
      <DataTable columns={fields} data={payload} isLoading={isValidating} />
    </Page>
  );
};

export default auth(TankInventory);
