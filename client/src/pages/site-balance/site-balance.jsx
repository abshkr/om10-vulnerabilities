import React, { useState } from 'react';
import { Select, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { SyncOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { STOCK_MANAGEMENT } from '../../api';
import transform from './transform';
import columns from './columns';
import auth from '../../auth';

const SiteBalance = () => {
  const [unit, setUnit] = useState('Litres');

  const { t } = useTranslation();
  const { data, revalidate, isValidating } = useSWR(STOCK_MANAGEMENT.SITE_BALANCE);

  const fields = columns(t);
  const payload = transform(data?.records, unit);

  const units = ['Litres', 'Cubic Metre', 'Imperial Gallon', 'U.S Gallon', 'Imperial Barrel', 'U.S Barrel'];

  const modifiers = (
    <>
      <Select key="1" style={{ width: 200 }} defaultValue={unit} onChange={setUnit}>
        {units.map((item) => {
          return (
            <Select.Option key={item} value={item}>
              {item}
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
    <Page page={t('pageMenu.stockManagement')} name={t('pageNames.siteBalance')} modifiers={modifiers}>
      <DataTable columns={fields} data={payload} isLoading={isValidating} />
    </Page>
  );
};

export default auth(SiteBalance);
