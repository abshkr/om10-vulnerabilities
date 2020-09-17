import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import moment from 'moment';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, FileSearchOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, Calendar, FormModal, WindowSearch } from '../../components';
import api, { TRANSACTION_LIST } from '../../api';
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

  const [start, setStart] = useState(moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));

  const {
    data: payload,
    isValidating,
    revalidate,
  } = useSWR(`${TRANSACTION_LIST.READ}?start_date=${start}&end_date=${end}`, { revalidateOnFocus: false });

  // const data = transactions?.records;
  const isLoading = isValidating;
  const fields = columns(t);
  const [data, setData] = useState(payload?.records);

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    // revalidate();
  };

  const setSearch = (values) => {
    if (!values.shls_trip_no && 
      !values.trsa_id && 
      !values.tnkr_code &&
      !values.load_id &&
      !values.use_date_range) {
      return;
    }
    api
      .get(TRANSACTION_LIST.SEARCH, {
        params: {
          trsa_trip: values.shls_trip_no,
          trsa_id: values.trsa_id,
          trsa_tanker: values.tnkr_code,
          load_id: values.load_id,
          start_date: values.use_date_range ? values.start_date : null,
          end_date: values.use_date_range ? values.end_date : null,
        },
      })
      .then((res) => {
        // setCompartments(res.data.records);
        setData(res.data.records);
      });
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

  const onRefresh = () => {
    if (transactionsDateRange !== false) {
      const ranges = getDateRangeOffset(String(transactionsDateRange), '7');

      setStart(moment().subtract(ranges.beforeToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
      setEnd(moment().add(ranges.afterToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
    }

    revalidate();
  }

  useEffect(() => {
    if (transactionsDateRange !== false) {
      const ranges = getDateRangeOffset(String(transactionsDateRange), '7');

      if (ranges.beforeToday !== 7) {
        setStart(moment().subtract(ranges.beforeToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
      }

      if (ranges.afterToday !== 7) {
        setEnd(moment().add(ranges.afterToday, 'days').format(SETTINGS.DATE_TIME_FORMAT));
      }
    }
  }, [transactionsDateRange]);

  useEffect(() => {
    if (payload?.records) {
      setData(payload?.records);
      payload.records = null;
    }
  }, [payload, setData]);

  const modifiers = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} max={1000} />

      <Button icon={<SyncOutlined />} onClick={() => onRefresh()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />

      <Button
        type="primary"
        icon={<FileSearchOutlined />}
        onClick={() =>
          WindowSearch(setSearch, t('operations.search'), {
            shls_trip_no: true,
            load_id: true,
            trsa_id: true,
            tnkr_code: true,
          })
        }
      >
        {t('operations.search')}
      </Button>
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
      <DataTable columns={fields} data={data} isLoading={isLoading} onClick={handleClick} clearFilterPlus={revalidate}/>
    </Page>
  );
};

export default auth(TransactionList);
