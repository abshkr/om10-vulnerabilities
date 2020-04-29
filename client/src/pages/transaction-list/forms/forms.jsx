import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import _ from 'lodash';
import useSWR from 'swr';

import { TRANSACTION_LIST } from '../../../api';
import transferColumns from './transfer-columns';
import { DataTable } from '../../../components';
import detailColumns from './detail.columns';

const TabPane = Tabs.TabPane;

const Forms = ({ value, isFromNomination }) => {
  const { data: transfer, isValidating: transferLoading } = useSWR(
    `${TRANSACTION_LIST.TRANSFER}?trsa_id=${value?.trsa_id}`
  );

  const { data: meters, isValidating: meterLoading } = useSWR(
    `${TRANSACTION_LIST.METER}?trsa_id=${value?.trsa_id}`
  );

  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tableContextAPI, setTableContextAPI] = useState(null);
  const [details, setDetails] = useState([]);

  const transferFields = transferColumns(isFromNomination, t);
  const detailFields = detailColumns(isFromNomination, t);

  useEffect(() => {
    if (isFromNomination && value?.transfers) {
      setData(value.transfers);
    }
  }, [value, isFromNomination]);

  useEffect(() => {
    if (tableContextAPI) {
      tableContextAPI.forEachNodeAfterFilter((node) => {
        if (node.id === '0') {
          node.setSelected(true);
        }
      });
    }
  }, [tableContextAPI]);

  useEffect(() => {
    if (isFromNomination && selected.length > 0) {
      const meters = selected[0]?.meters;
      const bases = selected[0]?.base_prods;
      const payload = [];
      const predicate = meters.length > bases.length ? meters : bases;

      _.forEach(predicate, (value, index) => {
        const meter = meters[index] || {};
        const base = bases[index] || {};

        const object = { ...meter, ...base };

        payload.push(object);
      });

      setDetails(payload);
    }

    if (selected.length === 0) {
      setDetails([]);
    }
  }, [selected, isFromNomination]);

  const transferData = isFromNomination ? data : transfer?.records;
  const meterData = isFromNomination ? details : meters?.records;

  return (
    <Tabs defaultActiveKey="1" animated={false}>
      <TabPane className="ant-tab-window-no-margin" tab={t('tabColumns.transactionProductDetail')} key="1">
        <DataTable
          columns={transferFields}
          data={transferData}
          height="42vh"
          selectionMode="single"
          handleSelect={setSelected}
          apiContext={setTableContextAPI}
        />
      </TabPane>

      <TabPane className="ant-tab-window-no-margin" tab={t('tabColumns.meterDetail')} key="2">
        <DataTable columns={detailFields} data={meterData} height="42vh" />
      </TabPane>
    </Tabs>
  );
};

export default Forms;
