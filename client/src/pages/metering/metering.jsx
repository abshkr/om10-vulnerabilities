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

const Metering = () => {
  const { t } = useTranslation();

  const { data, revalidate, isValidating } = useSWR(STOCK_MANAGEMENT.METERING);

  const access = useAuth('M_METERING');

  const [unit, setUnit] = useState('Litres');
  const [massUnit, setMassUnit] = useState('KG');

  const fields = columns(t);
  const payload = transform(data?.records, unit, massUnit);

  const units = ['Litres', 'Cubic Metre', 'Imperial Gallon', 'U.S Gallon', 'Imperial Barrel', 'U.S Barrel'];
  const massUnits = ['KG', 'Pound', 'Imperial Ton', 'Ton'];

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      <Download data={payload} isLoading={isValidating} columns={fields} />
    </>
  );

  const extra = (
    <>
      <div style={{ float: 'left' }}>
        <p style={{ float: 'left', fontSize: '0.7rem', marginRight: '0.2rem', paddingTop: '0.3rem' }}>
          {t('fields.massUnit') + ':'}
        </p>
        <Select key="1" style={{ width: 200 }} defaultValue={massUnit} onChange={setMassUnit}>
          {massUnits.map((item) => {
            return (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            );
          })}
        </Select>
      </div>

      <div style={{ float: 'left' }}>
        <p
          style={{
            float: 'left',
            fontSize: '0.7rem',
            marginRight: '0.2rem',
            marginLeft: '0.4rem',
            paddingTop: '0.3rem',
          }}
        >
          {t('fields.volumeUnit') + ':'}
        </p>
        <Select key="1" style={{ width: 200 }} defaultValue={unit} onChange={setUnit}>
          {units.map((item) => {
            return (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            );
          })}
        </Select>
      </div>
    </>
  );

  return (
    <Page
      page={t('pageMenu.reports')}
      name={t('pageNames.metering')}
      modifiers={modifiers}
      access={access}
      avatar="metering"
    >
      <DataTable columns={fields} data={payload} isLoading={isValidating} extra={extra} />
    </Page>
  );
};

export default auth(Metering);
