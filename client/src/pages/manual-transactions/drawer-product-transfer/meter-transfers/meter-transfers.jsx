import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin } from 'antd';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';
import api, { MANUAL_TRANSACTIONS } from '../../../../api';

import { buildMeterTransfers } from '../../data-builder';

const MeterTransfers = ({ 
  form, 
  sourceType, 
  selected, 
  transfers,
  productArms,
  dataBoard,
  setDataBoard,
  data,
  setData,
  dataLoaded,
  setDataLoaded,
}) => {
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(true);
  const [dataRendered, setDataRendered] = useState(false);

  const fields = columns(t);

  useEffect(() => {
    function getMeters() {
      setLoading(true);

      const meters = buildMeterTransfers(productArms, transfers);

      setLoading(false);
      if (!dataLoaded || !dataLoaded?.meter_transfers || dataLoaded?.meter_transfers?.length === 0) {
        setData(meters);
      } else {
        setData(dataLoaded.meter_transfers);
        console.log('MT 5 - MeterTransfers: data are loaded!');
      }
    }

    getMeters();
  }, [selected, transfers, productArms, dataLoaded]);

  useEffect(() => {
    if (data) {
      console.log('MeterTransfers: Data changed and do setFieldsValue. Data:', data);
      form.setFieldsValue({
        meter_transfers: data,
      });
      setDataRendered(true);
    }
  }, [data]);

  useEffect(() => {
    let board = dataBoard;
    if (!board) {
      board = {};
    }
    board.meter_transfers = data;
    setDataBoard(board);
  }, [data]);

  useEffect(() => {
    if (data?.length > 0) {
      console.log("MeterTransfers: sourceType changed", sourceType);
      setData([]);
    }
  }, [sourceType]);

  return (
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="meter_transfers">
        <DataTable 
          minimal={true}
          data={data} 
          height="70vh" 
          columns={fields} 
          editType={false}
        />
      </Form.Item>
    </Spin>
  );
};

export default MeterTransfers;
