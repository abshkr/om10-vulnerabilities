import React, { useState } from 'react';

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

const TransactionList = () => {
  const { t } = useTranslation();

  const [start, setStart] = useState(moment().subtract(3, 'years').format(SETTINGS.DATE_TIME_FORMAT));

  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

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
      form: <Forms value={value} start={start} end={end} />,
      id: value?.trsa_id,
      name: value?.trsa_trip,
      t,
      width: '90vw',
    });
  };

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
    <Page page={t('pageMenu.schedules')} name={t('pageNames.transactionList')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isLoading} onClick={handleClick} />
    </Page>
  );
};

export default auth(TransactionList);
