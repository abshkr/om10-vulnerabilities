import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import { EXPIRY_DATES } from '../../api';
import { Page, DataTable, Download, FormModal } from '../../components';

import Forms from './forms';

import columns from './columns';
import auth from '../../auth';

const ExpiryDates = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(EXPIRY_DATES.READ);

  const fields = columns(t);

  const handleClick = value => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.edt_target_code,
      name: value?.edt_type_desc,
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
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.expiryDates')} modifiers={modifiers}>
      <DataTable columns={fields} data={payload?.records} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(ExpiryDates);
