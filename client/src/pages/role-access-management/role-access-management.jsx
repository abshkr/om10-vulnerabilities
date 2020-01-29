import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { Page, DataTable, Download, FormModal } from '../../components';
import { ROLE_ACCESS_MANAGEMENT } from '../../api';

import columns from './columns';
import auth from '../../auth';

const RoleAccessManagement = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(ROLE_ACCESS_MANAGEMENT.READ);

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
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.roleAccessManagement')} modifiers={modifiers}>
      <DataTable columns={fields} data={payload?.records} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(RoleAccessManagement);
