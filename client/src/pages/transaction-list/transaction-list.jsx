import React, { useEffect, useState } from 'react';

import useSWR, { mutate } from 'swr';
import axios from 'axios';
import moment from 'moment';
import { Button, notification, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, CaretLeftOutlined, CloseOutlined, WarningOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, Calendar, FormModal } from '../../components';
import { TRANSACTION_LIST, MOVEMENT_NOMIATIONS } from '../../api';
import { SETTINGS, ROUTES } from '../../constants';
import { useQuery } from '../../hooks';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const TransactionList = () => {
  let history = useHistory();

  const { params } = useQuery(['mv_id', 'line_id']);
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  const [start, setStart] = useState(moment().subtract(3, 'years').format(SETTINGS.DATE_TIME_FORMAT));

  const [end, setEnd] = useState(moment().format(SETTINGS.DATE_TIME_FORMAT));

  const { data: transactions, isValidating, revalidate } = useSWR(
    `${TRANSACTION_LIST.READ}?start_date=${start}&end_date=${end}`
  );

  const isFromNomination = params?.mv_id && params?.line_id;
  const isLoading = loading || isValidating;
  const fields = columns(t);

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    revalidate();
  };

  const handleClick = (value) => {
    FormModal({
      value,
      form: <Forms value={value} isFromNomination={isFromNomination} />,
      id: value?.trsa_id,
      name: value?.trsa_trip,
      t,
      width: '90vw',
    });
  };

  const onClose = () => {
    const payloadId = selected[0]?.trsa_id;

    setLoading(true);

    Modal.confirm({
      title: t('prompts.cancel'),
      okText: t('operations.cancel'),
      okType: 'danger',
      icon: <WarningOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(TRANSACTION_LIST.CANCEL_TRANSACTION, {
            trsa_id: payloadId,
          })
          .then(
            axios.spread((response) => {
              mutate(`${TRANSACTION_LIST.READ}?start_date=${start}&end_date=${end}`);
              notification.success({
                message: t('messages.cancelSuccess'),
                description: t('descriptions.cancelSuccess'),
              });
            })
          )
          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.cancelFailed'),
            });
          })
          .finally(() => {
            setSelected([]);
            setLoading(false);
          });
      },
    });
  };
  useEffect(() => {
    if (isFromNomination) {
      setLoading(true);
      axios.get(MOVEMENT_NOMIATIONS.TRANSACTIONS, { params }).then((response) => {
        setData(response.data.records);
        setLoading(false);
      });
    } else {
      setData(transactions?.records);
    }
  }, [transactions, isFromNomination, history, params]);

  const modifiers = (
    <>
      {!isFromNomination && <Calendar handleChange={setRange} start={start} end={end} />}
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>

      <Download data={data} isLoading={isLoading} columns={fields} />

      {isFromNomination && (
        <Button icon={<CaretLeftOutlined />} onClick={() => history.push(ROUTES.TRANSACTION_LIST)}>
          {t('operations.returnToTransactionList')}
        </Button>
      )}

      <Button
        type="primary"
        icon={<CloseOutlined />}
        loading={isLoading}
        disabled={selected.length === 0 || selected[0]?.trsa_ed_dmy !== ''}
        onClick={onClose}
      >
        {t('operations.closeTransaction')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.schedules')}
      name={
        isFromNomination ? `${t('pageNames.transactionListbyNomination')}` : t('pageNames.transactionList')
      }
      modifiers={modifiers}
      description={isFromNomination && `For Movement Id ${params?.mv_id} and Line Item ${params?.line_id}`}
    >
      <DataTable
        columns={fields}
        data={data}
        isLoading={isLoading}
        onClick={handleClick}
        selectionMode="single"
        handleSelect={setSelected}
      />
    </Page>
  );
};

export default auth(TransactionList);
