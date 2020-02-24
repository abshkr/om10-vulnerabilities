import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { Page, DataTable, Download, FormModal } from '../../components';
import { SPECIAL_MOVEMENTS } from '../../api';

import columns from './columns';
import auth from '../../auth';

const SpecialMovements = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(SPECIAL_MOVEMENTS.READ);

  const fields = columns(t);
  const data = payload?.records;

  const handleClick = value => {
    FormModal({
      value,
      form: <div value={value} />,
      id: value?.mlitm_id,
      name: value?.mlitm_mov_key,
      t
    });
  };

  const modifiers = (
    <>
      <Button icon="sync" onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isValidating} columns={fields} />
      <Button type="primary" icon="plus" onClick={() => handleClick(null)} loading={isValidating}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.stockReconciliation')}
      name={t('pageNames.specialMovements')}
      modifiers={modifiers}
    >
      <DataTable columns={fields} data={data} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(SpecialMovements);
