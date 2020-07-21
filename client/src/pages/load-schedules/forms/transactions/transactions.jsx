import React, { useEffect, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Spin, Tabs, Divider } from 'antd';

import api, { LOAD_SCHEDULES } from '../../../../api';
import { DataTable } from '../../../../components';

import productColumns from './product-columns';
import transactionColumns from './transactions-columns';
import transferColumns from './transfer-columns';
import meterColumns from './meter-columns';

const Transactions = ({ value }) => {
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [products, setProducts] = useState([]);
  const [meters, setMeters] = useState([]);

  const productFields = productColumns(t);
  const transactionsFields = transactionColumns(t);
  const transferFields = transferColumns(t);
  const meterFields = meterColumns(t);

  const onTransactionSelect = (row) => {
    setTransfers(row?.transfers);
    setProducts(row?.transfers[0].base_prods);
    setMeters(row?.transfers[0].meters);
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

    if (value) {
      api
        .get(LOAD_SCHEDULES.TRANSACTIONS, {
          params: {
            supplier: value.supplier_code,
            trip_no: value.shls_trip_no,
          },
        })
        .then((res) => {
          setTransactions(res.data?.records);

          if (res?.data?.records?.length > 0) {
            setTransfers(res?.data?.records[0]?.transfers);
          }

          if (res?.data?.records[0]?.transfers?.length > 0) {
            setMeters(res?.data?.records[0]?.transfers[0]?.meters);
            setProducts(res?.data?.records[0]?.transfers[0]?.base_prods);
          }

          setLoading(false);
        });
    }
  }, [value]);

  return (
    <Spin spinning={isLoading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
      <div style={{ marginTop: 20 }} />

      <DataTable 
        data={transactions} 
        columns={transactionsFields} 
        height="80vh" 
        handleSelect={(payload) => onTransactionSelect(payload[0])}
        minimal 
      />

      <div style={{ marginTop: 10, marginBottom: 30 }} />

      <Divider orientation="left">{t("tabColumns.transferDetails")}</Divider>

      <DataTable 
        data={transfers} 
        columns={transferFields} 
        height="80vh" 
        minimal 
        handleSelect={(payload) => onTransferSelect(payload[0])}
      />

      <div style={{ marginTop: 20, marginBottom: 20 }} />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Base Product Details" key="1">
          <DataTable data={products} columns={productFields} height="80vh" minimal/>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Meter Details" key="2">
          <DataTable data={meters} columns={meterFields} height="80vh" minimal/>
        </Tabs.TabPane>
      </Tabs>
    </Spin>
  );
};

export default Transactions;
