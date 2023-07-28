import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { REPORT_CONFIGURATION } from '../../api';
import { useAuth, useConfig } from '../../hooks';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';

const ReportConfiguration = () => {
  const { t } = useTranslation();
  const config = useConfig();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const access = useAuth('M_REPOCONFIGURATION');

  const { data: payload, isValidating, revalidate } = useSWR(REPORT_CONFIGURATION.READ);

  const fields = columns(t, config?.reports_closeout_job);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.config');
  const name = t('pageNames.reportConfiguration');

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isLoading}
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} avatar="reportConfiguration">
      <DataTable
        data={data}
        columns={fields}
        isLoading={isLoading}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />
      <Forms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        config={config}
      />
    </Page>
  );
};

export default auth(ReportConfiguration);
