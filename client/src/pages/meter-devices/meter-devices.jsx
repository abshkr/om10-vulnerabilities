import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { METER_DEVICES } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const MeterDevices = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(METER_DEVICES.READ);

  const fields = columns(t);
  const data = payload?.records;

  const handleClick = value => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.mr_id,
      name: value?.mr_type_name,
      t
    });
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => handleClick(null)} loading={isValidating}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.stockManagement')} name={t('pageNames.meterDevices')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(MeterDevices);
