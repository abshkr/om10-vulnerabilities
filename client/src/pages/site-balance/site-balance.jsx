import React, { useState } from 'react';

import useSWR from 'swr';
import { Select, Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import jwtDecode from 'jwt-decode';

import { useAuth, useConfig } from 'hooks';
import { Page, DataTable, Download } from 'components';
import {TerminalList} from 'components/fields'
import { STOCK_MANAGEMENT } from 'api';
import auth from 'auth';

import transform from './transform';
import columns from './columns';

const SiteBalance = () => {
  const config = useConfig();
  const [unit, setUnit] = useState('Litres');

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const site_code = decoded?.site_code;
  // const [terminal, setTerminal] = useState(site_code);
  const [terminal, setTerminal] = useState('');

  const access = useAuth('M_SITEBALANCE');

  const { t } = useTranslation();
  const { data: closeouts, revalidate: closeoutRevalidate, isValidating: closeoutValidationg } = useSWR(
    STOCK_MANAGEMENT.CURR_CLOSEOUT
  );

  const closeout = closeouts?.records[0].closeout_nr;

  const { data, revalidate, isValidating } = useSWR(`${STOCK_MANAGEMENT.SITE_BALANCE}?cls_out=${closeout}&terminal=${terminal}`);

  const fields = columns(t, config);
  const payload = transform(data?.records, unit);

  // const units = ['Litres', 'Cubic Metre', 'Imperial Gallon', 'U.S Gallon', 'Imperial Barrel', 'U.S Barrel'];
  const units = [
    { code: 'Litres', title: t('units.litres') },
    { code: 'Cubic Metre', title: t('units.cubicMetre') },
    { code: 'Imperial Gallon', title: t('units.imperialGallon') },
    { code: 'U.S Gallon', title: t('units.usGallon') },
    { code: 'Imperial Barrel', title: t('units.imperialBarrel') },
    { code: 'U.S Barrel', title: t('units.usBarrel') },
  ];

  const modifiers = (
    <>
      {config?.siteUseMultiTerminals && (
        <TerminalList value={terminal} listOptions={[]}
        itemCode={'tank_terminal'} itemTitle={'terminal'} itemRequired={false} itemDisabled={false} onChange={setTerminal} />
      )}

      <Select
        dropdownMatchSelectWidth={false}
        key="1"
        style={{ width: 200, marginLeft: 5 }}
        defaultValue={unit}
        onChange={setUnit}
      >
        {units.map((item) => {
          return (
            <Select.Option key={item.code} value={item.code}>
              {item.title}
            </Select.Option>
          );
        })}
      </Select>

      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      <Download data={payload} isLoading={isValidating} columns={fields} />
    </>
  );

  return (
    <Page
      page={t('pageMenu.stock')}
      name={t('pageNames.siteBalance')}
      modifiers={modifiers}
      access={access}
      avatar="siteBalance"
    >
      <DataTable columns={fields} data={payload} isLoading={isValidating} />
    </Page>
  );
};

export default auth(SiteBalance);
