import React, { useState } from 'react';

import { SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Select, Button } from 'antd';
import useSWR from 'swr';

import { Page, DataTable, Download } from 'components';
import { STOCK_MANAGEMENT } from 'api';
import useAuth from 'hooks/use-auth';
import auth from 'auth';

import transform from './transform';
import columns from './columns';

const ProductInventory = () => {
  const [unit, setUnit] = useState('Litres');

  const { t } = useTranslation();
  const { data, revalidate, isValidating } = useSWR(STOCK_MANAGEMENT.PRODUCT_INVENTORY);

  const access = useAuth('M_PRODUCTINVENTORY');

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
      name={t('pageNames.productInventory')}
      avatar="productInventory"
      modifiers={modifiers}
      access={access}
    >
      <DataTable columns={fields} data={payload} isLoading={isValidating} />
    </Page>
  );
};

export default auth(ProductInventory);
