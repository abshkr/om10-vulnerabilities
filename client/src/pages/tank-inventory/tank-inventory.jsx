import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { SyncOutlined } from '@ant-design/icons';
import jwtDecode from 'jwt-decode';

import { Page, PowerTable as DataTable, Download } from '../../components';
import { TerminalList } from 'components/fields';
import { STOCK_MANAGEMENT } from '../../api';
import columns from './columns';
import auth from '../../auth';
import useAuth from 'hooks/use-auth';
import useConfig from 'hooks/use-config';

const TankInventory = () => {
  const config = useConfig();
  const { t } = useTranslation();
  const access = useAuth('M_TANKINVENTORY');

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const site_code = decoded?.site_code;
  // const [terminal, setTerminal] = useState(site_code);
  const [terminal, setTerminal] = useState('');

  // const { data, revalidate, isValidating } = useSWR(STOCK_MANAGEMENT.TANK_INVENTORY);
  const { data, revalidate, isValidating } = useSWR(
    `${STOCK_MANAGEMENT.TANK_INVENTORY}?terminal=${terminal}`
  );

  const payload = data?.records;
  const fields = columns(t, config);

  const modifiers = (
    <>
      {config?.siteUseMultiTerminals && (
        <TerminalList
          value={terminal}
          listOptions={[]}
          itemCode={'tank_terminal'}
          itemTitle={'terminal'}
          itemRequired={false}
          itemDisabled={false}
          onChange={setTerminal}
        />
      )}
      <Space></Space>

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
      <DataTable
        columns={fields}
        data={payload}
        isLoading={isValidating}
        columnAdjustable={config?.siteCustomColumnTankStock}
        pageModule={'M_TANKINVENTORY'}
      />
    </Page>
  );
};

export default auth(TankInventory);
