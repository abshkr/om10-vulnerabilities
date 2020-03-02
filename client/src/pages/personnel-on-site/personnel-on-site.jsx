import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { PERSONNEL_ON_SITE } from '../../api';
import columns from './columns';
import auth from '../../auth';

const PersonnelOnSite = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(PERSONNEL_ON_SITE.READ);

  const fields = columns(t);

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
    </>
  );

  return (
    <Page page={t('pageMenu.reports')} name={t('pageNames.personnelOnSite')} modifiers={modifiers}>
      <DataTable columns={fields} data={payload?.records} isLoading={isValidating} />
    </Page>
  );
};

export default auth(PersonnelOnSite);
