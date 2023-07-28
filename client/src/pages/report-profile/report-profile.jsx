import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { REPORT_PROFILE } from '../../api';
import transfrom from './transform';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import { useConfig, useAuth } from 'hooks';

const ReportProfile = () => {
  const { t } = useTranslation();
  // hide the closeout jobs
  // const { reports_closeout_job } = useConfig();
  const reports_closeout_job = false;
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  const access = useAuth('M_REPOPROFILE');

  const { data: payload, isValidating, revalidate } = useSWR(REPORT_PROFILE.READ);

  const fields = columns(t, reports_closeout_job);
  const data = transfrom(payload?.records, t);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      <Download data={payload?.records} isLoading={isValidating} columns={fields} />

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isValidating}
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.config')}
      name={t('pageNames.reportProfile')}
      modifiers={modifiers}
      access={access}
      avatar="reportProfile"
    >
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        selectionMode="single"
        filterValue={filterValue}
      />
      <Forms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        setFilterValue={setFilterValue}
      />
    </Page>
  );
};

export default auth(ReportProfile);
