import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { LOAD_METERS } from '../../api';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';
import useAuth from 'hooks/use-auth';

const LoadMeters = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(LOAD_METERS.READ);

  const access = useAuth('M_LOADMETERS');

  const fields = columns(t);
  const data = payload?.records;

  const handleClick = (value) => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.bam_code,
      name: value?.bam_name,
      t,
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
    <Page page={t('pageMenu.gantry')} name={t('pageNames.loadMeters')} modifiers={modifiers} access={access}>
      <DataTable columns={fields} data={data} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(LoadMeters);
