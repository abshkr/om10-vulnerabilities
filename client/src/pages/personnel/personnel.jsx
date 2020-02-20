import React from 'react';

import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { Page, DataTable, Download, FormModal } from '../../components';
import { PERSONNEL } from '../../api';

import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const Personnel = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(PERSONNEL.READ);

  const fields = columns(t);

  const handleClick = value => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.per_code,
      name: value?.per_name,
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
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.personnel')} modifiers={modifiers}>
      <DataTable columns={fields} data={payload?.records} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(Personnel);
