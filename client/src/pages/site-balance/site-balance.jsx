import React, { useState } from 'react';

import useSWR from 'swr';
import { Select, Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { useAuth } from 'hooks';
import { Page, DataTable, Download } from 'components';
import { STOCK_MANAGEMENT } from 'api';
import auth from 'auth';

import transform from './transform';
import columns from './columns';

const SiteBalance = () => {
  const [unit, setUnit] = useState('Litres');

  const access = useAuth('M_SITEBALANCE');

  const { t } = useTranslation();
  const { data, revalidate, isValidating } = useSWR(STOCK_MANAGEMENT.SITE_BALANCE);

  const fields = columns(t);
  const payload = transform(data?.records, unit);

  // const units = ['Litres', 'Cubic Metre', 'Imperial Gallon', 'U.S Gallon', 'Imperial Barrel', 'U.S Barrel'];
  const units = [
    {code: 'Litres', title: t('units.litres')},
    {code: 'Cubic Metre', title: t('units.cubicMetre')},
    {code: 'Imperial Gallon', title: t('units.imperialGallon')},
    {code: 'U.S Gallon', title: t('units.usGallon')},
    {code: 'Imperial Barrel', title: t('units.imperialBarrel')},
    {code: 'U.S Barrel', title: t('units.usBarrel')},
  ];

  const modifiers = (
    <>
      <Select 
        dropdownMatchSelectWidth={false}
        key="1" 
        style={{ width: 200 }} 
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
