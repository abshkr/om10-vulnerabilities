import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { SPECIAL_MOVEMENTS } from '../../api';

import columns from './columns';
import auth from '../../auth';

const MovementReasons = () => {
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
    <Page
      page={t('pageMenu.stockReconciliation')}
      name={t('pageNames.movementReasons')}
      modifiers={modifiers}
    >
      <DataTable columns={fields} data={data} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(MovementReasons);
