import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { REPORT_PROFILE } from '../../api';
import transfrom from './transform';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const ReportProfile = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(REPORT_PROFILE.READ);

  const fields = columns(t);
  const data = transfrom(payload?.records);

  const handleClick = value => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.report_jasper_file,
      name: value?.report_name,
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
    <Page page={t('pageMenu.reports')} name={t('pageNames.reportProfile')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(ReportProfile);
