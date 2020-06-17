import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, Calendar, FormModal } from '../../components';
import { TRANSACTION_LIST } from '../../api';
import { SETTINGS } from '../../constants';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import { useAuth, useConfig } from 'hooks';
import { getDateRangeOffset } from 'utils';

const TransactionList = () => {
  const { transactionsDateRange } = useConfig();
  const { t } = useTranslation();

  const access = useAuth('M_TRANSACTIONLIST');

  const [start, setStart] = useState(moment().subtract(0, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().add(0, 'days').format(SETTINGS.DATE_TIME_FORMAT));

  const { data: transactions, isValidating, revalidate } = useSWR(
    `${TRANSACTION_LIST.READ}?start_date=${start}&end_date=${end}`
  );

  const data = transactions?.records;
  const isLoading = isValidating;
  const fields = columns(t);

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    revalidate();
  };

  const handleClick = (value) => {
    FormModal({
      value,
      form: <Forms value={value} start={start} end={end} access={access} />,
      id: value?.trsa_id,
      name: value?.trsa_trip,
      t,
      width: '90vw',
    });
  };

  useEffect(() => {
    const ranges = getDateRangeOffset(String(transactionsDateRange), '7');

    setStart(moment().subtract(ranges.beforeToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
    setEnd(moment().add(ranges.afterToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  }, [transactionsDateRange]);

  const modifiers = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} />
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />
    </>
  );

  return (
    <Page
      page={t('pageMenu.operations')}
      name={t('pageNames.transactionList')}
      modifiers={modifiers}
      avatar="transactionList"
      access={access}
    >
      <DataTable columns={fields} data={data} isLoading={isLoading} onClick={handleClick} />
    </Page>
  );
};

export default auth(TransactionList);
