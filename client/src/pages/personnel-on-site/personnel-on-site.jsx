import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { PERSONNEL_ON_SITE } from '../../api';
import columns from './columns';
import auth from '../../auth';
import useAuth from 'hooks/use-auth';

const PersonnelOnSite = () => {
  const { t } = useTranslation();

  const access = useAuth('M_ONSITEREPORT');

  const { data: payload, isValidating, revalidate } = useSWR(PERSONNEL_ON_SITE.READ);

  const fields = columns(t);

  const page = t('pageMenu.reports');
  const name = t('pageNames.personnelOnSite');

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
    </>
  );

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} avatar="personnelOnSite">
      <DataTable columns={fields} data={payload?.records} isLoading={isValidating} />
    </Page>
  );
};

export default auth(PersonnelOnSite);
