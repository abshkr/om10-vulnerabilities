import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';
import moment from 'dayjs';

import { Page, DataTable, Download, Calendar } from 'components';
import * as SETTINGS from 'constants/settings';
import { AUDITING_DATA } from 'api';
import useAuth from 'hooks/use-auth';
import { useConfig } from 'hooks';
import auth from 'auth';

import columns from './columns';

import Forms from './forms';
import { getDateRangeOffset, getCurrentTime } from 'utils';

const AuditingData = () => {
  const { auditDateRange, serverTime } = useConfig();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  const access = useAuth('M_AUDITREPORT');
  const { t } = useTranslation();

  const [start, setStart] = useState(moment().subtract(1, 'days').format(SETTINGS.DATE_TIME_FORMAT));

  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  const {
    data: payload,
    isValidating,
    mutate: revalidate,
  } = useSWR(`${AUDITING_DATA.READ}?start_date=${start}&end_date=${end}`);

  const page = t('pageMenu.reports');
  const name = t('pageNames.auditingData');

  const data = payload?.records;
  const fields = columns(t);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    revalidate();
  };

  const onRefresh = async () => {
    if (auditDateRange !== false) {
      const ranges = getDateRangeOffset(String(auditDateRange), '1');

      const currTime = await getCurrentTime();
      const startTime = moment(currTime, SETTINGS.DATE_TIME_FORMAT)
        .subtract(ranges.beforeToday, 'days')
        .format(SETTINGS.DATE_TIME_FORMAT);
      const endTime = moment(currTime, SETTINGS.DATE_TIME_FORMAT)
        .add(ranges.afterToday, 'days')
        .format(SETTINGS.DATE_TIME_FORMAT);
      setStart(startTime);
      setEnd(endTime);
    }

    // Don't need revalidate, let useSWR handle itself while parameter changes
    // revalidate();
  };

  useEffect(() => {
    if (auditDateRange !== false && serverTime) {
      const ranges = getDateRangeOffset(String(auditDateRange), '1');

      if (ranges.beforeToday !== -1) {
        setStart(
          moment(serverTime, SETTINGS.DATE_TIME_FORMAT)
            .subtract(ranges.beforeToday, 'days')
            .format(SETTINGS.DATE_TIME_FORMAT)
        );
      }

      if (ranges.afterToday !== -1) {
        setEnd(
          moment(serverTime, SETTINGS.DATE_TIME_FORMAT)
            .add(ranges.afterToday, 'days')
            .format(SETTINGS.DATE_TIME_FORMAT)
        );
      }
    }
  }, [auditDateRange, serverTime]);

  const modifiers = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} />

      <Button icon={<SyncOutlined />} onClick={() => onRefresh()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isValidating} columns={fields} />
    </>
  );

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} avatar="auditingData">
      <DataTable
        minimal={false}
        data={data}
        columns={fields}
        isLoading={isValidating}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
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

export default auth(AuditingData);
