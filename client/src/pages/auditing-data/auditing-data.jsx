import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';
import moment from 'moment';

import { Page, DataTable, Download, Calendar } from '../../components';
import { AUDITING_DATA } from '../../api';
import { SETTINGS } from '../../constants';
import columns from './columns';
import auth from '../../auth';

const AuditingData = () => {
  const { t } = useTranslation();

  const [start, setStart] = useState(moment().subtract(1, 'days').format(SETTINGS.DATE_TIME_FORMAT));

  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  const { data: payload, isValidating, revalidate } = useSWR(
    `${AUDITING_DATA.READ}?start_date=${start}&end_date=${end}`
  );

  const data = payload?.records;
  const fields = columns(t);

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    revalidate();
  };

  const modifiers = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} />

      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isValidating} columns={fields} />
    </>
  );

  return (
    <Page page={t('pageMenu.reports')} name={t('pageNames.auditingData')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isValidating} />
    </Page>
  );
};

export default auth(AuditingData);
