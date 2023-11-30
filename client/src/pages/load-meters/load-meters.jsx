import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { LOAD_METERS } from '../../api';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';
import { useAuth, useConfig } from 'hooks';

const LoadMeters = () => {
  const { enable_meter_facor } = useConfig();

  const { t } = useTranslation();
  const [filterValue, setFilterValue] = useState('');

  const { data: payload, isValidating, mutate: revalidate } = useSWR(LOAD_METERS.READ);

  const access = useAuth('M_LOADMETERS');

  const fields = columns(t, enable_meter_facor);
  const data = payload?.records;

  const handleFilter = (value) => {
    setFilterValue(value);
  };

  const handleClick = (value) => {
    FormModal({
      value,
      form: <Forms value={value} handleFilter={handleFilter} enable_meter_facor={enable_meter_facor} />,
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
    <Page page={t('pageMenu.config')} name={t('pageNames.loadMeters')} modifiers={modifiers} access={access}>
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        onClick={handleClick}
        filterValue={filterValue}
      />
    </Page>
  );
};

export default auth(LoadMeters);
