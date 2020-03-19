import React from 'react';

import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { TANKS, COMMON } from '../../api';

import generator from './generator';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const TankConfiguration = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(TANKS.READ);
  const { data: configuration } = useSWR(COMMON.CONFIG);

  const fields = columns(configuration, t);
  const data = generator(payload?.records);

  const handleClick = value => {
    FormModal({
      value,
      form: <Forms value={value} configuration={configuration} />,
      id: value?.tank_code,
      name: value?.tank_name,
      t
    });
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isValidating} columns={fields} />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => handleClick(null)} loading={isValidating}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.gantry')} name={t('pageNames.tankConfiguration')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(TankConfiguration);
