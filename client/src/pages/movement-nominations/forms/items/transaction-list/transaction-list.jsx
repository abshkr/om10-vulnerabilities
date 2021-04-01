import React, { useEffect, useState } from 'react';

import { DataTable } from '../../../../../components';
import { useTranslation } from 'react-i18next';
import { MOVEMENT_NOMIATIONS } from '../../../../../api';
import useSWR from 'swr';
import { Tabs } from 'antd';
import _ from 'lodash';

import transferColumns from './transfer-columns';
import meterColumns from './meters-columns';
import detailColumns from './detail-columns';
import columns from './columns';
import TrueRenderer from './true-render';

const TransactionList = ({ selected, config }) => {
  const url = selected
    ? `${MOVEMENT_NOMIATIONS.TRANSACTIONS}?mv_id=${selected?.mvitm_move_id}&line_id=${selected?.mvitm_line_id}`
    : null;

  const { data: payload } = useSWR(url);
  const { t } = useTranslation();

  const [transactions, setTransactions] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [products, setProducts] = useState([]);
  const [meters, setMeters] = useState([]);

  const transferFields = transferColumns(t, config);
  const detailFields = detailColumns(t, config);
  const meterFields = meterColumns(t);
  const fields = columns(t);

  const onTransactionSelect = (value) => {
    const transfers = value[0]?.transfers;

    setTransfers(transfers);
    setProducts([]);
    setMeters([]);
  };

  const onTransferSelect = (value) => {
    const products = value[0]?.base_prods;
    const meters = value[0]?.meters;

    setProducts(products);
    setMeters(meters);
  };

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

  useEffect(() => {
    if (payload) {
      const trsaData = adjustTransactions(payload?.records);
      setTransactions(trsaData);
    }
  }, [payload, setTransactions, adjustTransactions]);

  const components = {
    TrueRenderer,
  };

  return (
    <Tabs defaultActiveKey="1" animated={false}>
      <Tabs.TabPane tab={t('tabColumns.transactionForNomination')} forceRender={true} key="1">
        <DataTable
          data={transactions}
          columns={fields}
          parentHeight="200px"
          selectionMode="single"
          handleSelect={onTransactionSelect}
          components={components}
          autoColWidth
        />

        <div style={{ marginTop: 10 }}>
          <DataTable
            data={transfers}
            columns={transferFields}
            parentHeight="200px"
            selectionMode="single"
            handleSelect={onTransferSelect}
            minimal
          />
        </div>

        <Tabs defaultActiveKey="1" animated={false}>
          <Tabs.TabPane tab={t('tabColumns.meterDetails')} forceRender={true} key="1">
            <DataTable data={meters} columns={meterFields} parentHeight="200px" minimal />
          </Tabs.TabPane>

          <Tabs.TabPane tab={t('tabColumns.baseProductDetails')} forceRender={true} key="2">
            <DataTable data={products} columns={detailFields} parentHeight="200px" minimal />
          </Tabs.TabPane>
        </Tabs>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default TransactionList;
