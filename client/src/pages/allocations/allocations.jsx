import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { Page, DataTable, Download, FormModal } from '../../components';
import { ALLOCATIONS } from '../../api';

import Forms from './forms';

import columns from './columns';
import auth from '../../auth';

const Allocations = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(ALLOCATIONS.READ);

  const fields = columns(t);

  const handleClick = value => {
    FormModal({
      value,
      form: <Forms value={value} data={payload} />,
      id: 'test',
      name: 'test',
      t,
      width: '90vw'
    });
  };

  const modifiers = (
    <>
      <Button icon="sync" onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
      <Button type="primary" icon="plus" onClick={() => handleClick(null)} loading={isValidating}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.gantry')} name={t('pageNames.allocations')} modifiers={modifiers}>
      <DataTable columns={fields} data={payload?.records} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(Allocations);
