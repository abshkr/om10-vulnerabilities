import React, { useState } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import { Page, DataTable, Download, Calendar } from '../../components';
import { TRANSACTION_LIST } from '../../api';
import { SETTINGS } from '../../constants';
import auth from '../../auth';

const TransactionList = () => {
  const { t } = useTranslation();

  const [start, setStart] = useState(
    moment()
      .subtract(3, 'hour')
      .format(SETTINGS.DATE_TIME_FORMAT)
  );

  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  const { data: transactions, isValidating, revalidate } = useSWR(
    `${TRANSACTION_LIST.READ}?start_date=${start}&end_date${end}`
  );

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    revalidate();
  };

  const fields = [];

  const modifiers = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} />

      <Button icon="sync" loading={isValidating} onClick={revalidate}>
        {t('operations.refresh')}
      </Button>
      <Download data={transactions?.records} isLoading={isValidating} columns={fields} />
    </>
  );

  return (
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.expiryDates')} modifiers={modifiers}>
      <DataTable columns={fields} data={transactions?.records} isLoading={isValidating} />
    </Page>
  );
};

export default auth(TransactionList);
