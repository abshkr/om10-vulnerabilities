import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import axios from 'axios';
import moment from 'moment';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, CaretLeftOutlined } from '@ant-design/icons';

import { useQuery } from '../../hooks';
import { Page, DataTable, Download, Calendar } from '../../components';
import { TRANSACTION_LIST, MOVEMENT_NOMIATIONS } from '../../api';
import { SETTINGS, ROUTES } from '../../constants';
import auth from '../../auth';
import columns from './columns';

const TransactionList = () => {
  let history = useHistory();

  const { params } = useQuery(['mv_id', 'line_id']);
  const { t } = useTranslation();

  const { data: transactions, isValidating, revalidate } = useSWR(TRANSACTION_LIST.READ);

  const [data, setData] = useState([]);

  const [start, setStart] = useState(
    moment()
      .subtract(3, 'years')
      .format(SETTINGS.DATE_TIME_FORMAT)
  );

  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  const isFromNomination = params?.mv_id;
  const fields = columns(t);

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    revalidate();
  };

  useEffect(() => {
    if (params?.mv_id) {
      axios
        .get(MOVEMENT_NOMIATIONS.TRANSACTIONS, { params })
        .then(response => setData(response.data.records));
    } else {
      setData(transactions?.records);
    }
  }, [transactions, params, history]);

  const modifiers = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} />
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isValidating} columns={fields} />

      {isFromNomination && (
        <Button icon={<CaretLeftOutlined />} onClick={() => history.push(ROUTES.TRANSACTION_LIST)}>
          {t('operations.returnToTransactionList')}
        </Button>
      )}
    </>
  );

  return (
    <Page
      page={t('pageMenu.schedules')}
      name={isFromNomination ? t('pageNames.transactionListbyNomination') : t('pageNames.transactionList')}
      modifiers={modifiers}
    >
      <DataTable columns={fields} data={data} isLoading={isValidating} />
    </Page>
  );
};

export default auth(TransactionList);
