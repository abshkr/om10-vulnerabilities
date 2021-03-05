import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { SyncOutlined } from '@ant-design/icons';
import { Page, DataTable, Download } from '../../components';
import { STOCK_MANAGEMENT } from '../../api';
import columns from './columns';
import auth from '../../auth';
import useAuth from 'hooks/use-auth';
import useConfig from 'hooks/use-config';

const TankInventory = () => {
  const config = useConfig();
  const { t } = useTranslation();
  const access = useAuth('M_TANKINVENTORY');
  const { data, revalidate, isValidating } = useSWR(STOCK_MANAGEMENT.TANK_INVENTORY);

  const payload = data?.records;
  const fields = columns(t, config);

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
      access={access}
    >
      <DataTable columns={fields} data={payload} isLoading={isValidating} />
    </Page>
  );
};

export default auth(TankInventory);
