import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { Page, DataTable, Download, FormModal } from '../../components';
import { TIME_CODES } from '../../api';

import columns from './columns';
import auth from '../../auth';

const TimeCodes = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(TIME_CODES.READ);

  const fields = columns(t);

  const handleClick = value => {
    FormModal({
      value,
      form: <div />,
      id: 'test',
      name: 'test',
      t
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
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.timeCodes')} modifiers={modifiers}>
      <DataTable columns={fields} data={payload?.records} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(TimeCodes);
