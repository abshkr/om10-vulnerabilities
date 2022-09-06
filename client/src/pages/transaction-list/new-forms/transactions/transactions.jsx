import React, { useEffect, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Spin, Tabs, Divider } from 'antd';
import _ from 'lodash';

import api, { LOAD_SCHEDULES } from '../../../../api';
import { DataTable } from '../../../../components';

import productColumns from './product-columns';
import transactionColumns from './transactions-columns';
import transferColumns from './transfer-columns';
import meterColumns from './meter-columns';
import TrueRenderer from './true-render';

const Transactions = ({ value, config, isLoading, setLoading }) => {
  const { t } = useTranslation();

  const [transactions, setTransactions] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [products, setProducts] = useState([]);
  const [meters, setMeters] = useState([]);

  const productFields = productColumns(t, config);
  const transactionsFields = transactionColumns(t);
  const transferFields = transferColumns(t, config);
  const meterFields = meterColumns(t);

  const adjustTransactions = (transactions) => {
    _.forEach(transactions, (transaction) => {
      const transfers = transaction?.transfers;
      _.forEach(transfers, (transfer) => {
        const meters = transfer?.meters;
        _.forEach(meters, (meter) => {
          meter.trsf_baa_code = transfer?.trsf_baa_code;
          meter.baa_bay_seq = transfer?.baa_bay_seq;
        });
      });
    });

    return transactions;
  };

  const onTransactionSelect = (row) => {
    setTransfers(row?.transfers);
    setProducts(row?.transfers?.[0]?.base_prods);
    setMeters(row?.transfers?.[0]?.meters);
  };

  const onTransferSelect = (row) => {
    setProducts(row?.base_prods);
    setMeters(row?.meters);
  };

  useEffect(() => {
    setLoading(true);

    setTransactions(null);
    setTransfers(null);
    setProducts(null);
    setMeters(null);

    console.log('........ .......trsa', value);
    if (value) {
      api
        .get(LOAD_SCHEDULES.TRANSACTIONS, {
          params: {
            supplier: value.trsa_supplier,
            trip_no: value.trsa_trip,
          },
        })
        .then((res) => {
          const thisTransaction = _.filter(
            res.data?.records,
            (o) => String(o?.trsa_id) === String(value?.trsa_id)
          );
          // const trsaData = adjustTransactions(res.data?.records);
          const trsaData = adjustTransactions(thisTransaction);
          setTransactions(trsaData);

          if (thisTransaction?.length > 0) {
            setTransfers(thisTransaction?.[0]?.transfers);
          }

          if (thisTransaction?.[0]?.transfers?.length > 0) {
            setMeters(thisTransaction?.[0]?.transfers?.[0]?.meters);
            setProducts(thisTransaction?.[0]?.transfers?.[0]?.base_prods);
          }

          setLoading(false);
        });
    }
  }, [value]);

  const components = {
    TrueRenderer,
  };

  return (
    <Spin spinning={isLoading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={t('tabColumns.transactionDetails')} key="1">
          <DataTable
            data={transactions}
            columns={transactionsFields}
            height="85vh"
            handleSelect={(payload) => onTransactionSelect(payload[0])}
            components={components}
            autoColWidth
            minimal
          />
        </Tabs.TabPane>
      </Tabs>

      <div style={{ marginTop: 10, marginBottom: 30 }} />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={t('tabColumns.transferDetails')} key="1">
          <DataTable
            data={transfers}
            columns={transferFields}
            height="80vh"
            minimal
            handleSelect={(payload) => onTransferSelect(payload[0])}
          />
        </Tabs.TabPane>
      </Tabs>

      <div style={{ marginTop: 20, marginBottom: 20 }} />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={t('tabColumns.baseProductDetails')} key="1">
          <DataTable data={products} columns={productFields} height="80vh" minimal />
        </Tabs.TabPane>

        <Tabs.TabPane tab={t('tabColumns.meterDetails')} key="2">
          <DataTable data={meters} columns={meterFields} height="80vh" minimal />
        </Tabs.TabPane>
      </Tabs>
    </Spin>
  );
};

export default Transactions;
