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

  // const units = ['Litres', 'Cubic Metre', 'Imperial Gallon', 'U.S Gallon', 'Imperial Barrel', 'U.S Barrel'];
  const units = [
    {code: 'Litres', title: t('units.litres')},
    {code: 'Cubic Metre', title: t('units.cubicMetre')},
    {code: 'Imperial Gallon', title: t('units.imperialGallon')},
    {code: 'U.S Gallon', title: t('units.usGallon')},
    {code: 'Imperial Barrel', title: t('units.imperialBarrel')},
    {code: 'U.S Barrel', title: t('units.usBarrel')},
  ];
  // const massUnits = ['KG', 'Pound', 'Imperial Ton', 'Ton'];
  const massUnits = [
    {code: 'KG', title: t('units.kg')},
    {code: 'Pound', title: t('units.pound')},
    {code: 'Imperial Ton', title: t('units.imperialTon')},
    {code: 'Ton', title: t('units.ton')},
  ];


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
        <span style={{ float: 'left', fontSize: '0.8rem', marginRight: '0.2rem', paddingTop: '0.3rem' }}>
          {t('fields.massUnit') + ':'}
        </span>
        <Select 
          dropdownMatchSelectWidth={false}
          key="1" 
          style={{ width: 200 }} 
          defaultValue={massUnit} 
          onChange={setMassUnit}
        >
          {massUnits.map((item) => {
            return (
              <Select.Option key={item.code} value={item.code}>
                {item.title}
              </Select.Option>
            );
          })}
        </Select>
      </div>

      <div style={{ float: 'left' }}>
        <span
          style={{
            float: 'left',
            fontSize: '0.8rem',
            marginRight: '0.2rem',
            marginLeft: '0.4rem',
            paddingTop: '0.3rem',
          }}
        >
          {t('fields.volumeUnit') + ':'}
        </span>
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
