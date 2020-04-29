import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { TANK_STATUS } from '../../api';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';

const TankStatus = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(TANK_STATUS.READ);

  const fields = columns(t);
  const data = payload?.records;

  const handleClick = (value) => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.tank_code,
      name: value?.tank_name,
      width: '60vw',
      t,
    });
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
    </>
  );

  return (
    <Page page={t('pageMenu.stockManagement')} name={t('pageNames.tankStatus')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(TankStatus);
