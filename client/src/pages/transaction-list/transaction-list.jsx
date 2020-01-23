import React, { useState, useEffect } from 'react';

import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import { Page, DataTable, Download, Calendar } from '../../components';
import { useAPI } from '../../hooks';
import { TRANSACTION_LIST } from '../../api';
import { SETTINGS } from '../../constants';

import auth from '../../auth';

const TransactionList = () => {
  const [start, setStart] = useState(
    moment()
      .subtract(3, 'hour')
      .format(SETTINGS.DATE_TIME_FORMAT)
  );

  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  const { data, isLoading, refetch } = useAPI([TRANSACTION_LIST.READ]);

  const { t } = useTranslation();

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    refetch();
  };

  const fields = [];

  const modifiers = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} />

      <Button icon="sync" onClick={() => refetch()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isLoading} columns={fields} />
    </>
  );

  return (
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.expiryDates')} modifiers={modifiers}>
      <DataTable columns={fields} data={data?.[0].records} isLoading={isLoading} />
    </Page>
  );
};

export default auth(TransactionList);
