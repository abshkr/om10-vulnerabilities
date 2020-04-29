import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import _ from 'lodash';

import transferColumns from './transfer-columns';
import { DataTable } from '../../../components';
import detailColumns from './detail.columns';

const TabPane = Tabs.TabPane;

const Forms = ({ value, isFromNomination }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tableContextAPI, setTableContextAPI] = useState(null);
  const [details, setDetails] = useState([]);

  const transferFields = transferColumns(t);
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
    if (selected.length > 0) {
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
  }, [selected]);

  return (
    <Tabs defaultActiveKey="1" animated={false}>
      <TabPane className="ant-tab-window-no-margin" tab={t('tabColumns.transactionProductDetail')} key="1">
        <DataTable
          columns={transferFields}
          data={data}
          height="42vh"
          selectionMode="single"
          handleSelect={setSelected}
          apiContext={setTableContextAPI}
        />
      </TabPane>

      <TabPane className="ant-tab-window-no-margin" tab={t('tabColumns.meterDetail')} key="2">
        <DataTable columns={detailFields} data={details} height="42vh" />
      </TabPane>
    </Tabs>
  );
};

export default Forms;
