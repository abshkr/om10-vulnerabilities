import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { ROLE_ACCESS_MANAGEMENT } from '../../api';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';

const RoleAccessManagement = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(ROLE_ACCESS_MANAGEMENT.READ);

  const fields = columns(t);
  const data = payload?.records;

  const handleClick = (value) => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.role_code,
      name: value?.auth_level_name,
      width: '60vw',
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
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.roleAccessManagement')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(RoleAccessManagement);
