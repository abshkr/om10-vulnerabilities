import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin } from 'antd';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';
import api, { MANUAL_TRANSACTIONS } from '../../../../api';

import { buildMeterTransfers, adjustMeterTotals, buildMeterTotals } from '../../data-builder';

const MeterTotals = ({ 
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

  /* const adjustMeterTotals = (items) => {
    const totals = [];
    console.log('MeterTotals: adjustMeterTotals - start', items);
    let itemExisted = false;

    _.forEach(items, (item) => {
      itemExisted = false;
      for (let index = 0; index < totals.length; index++) {
        const total = totals[index];
        if (total.trsf_mtr_cd === item.trsf_mtr_cd) {
          // may need adjust metering
          // trsf_mtr_opn_amb
          // trsf_mtr_opn_cor
          // trsf_mtr_open_kg
          // trsf_mtr_cls_amb
          // trsf_mtr_cls_cor
          // trsf_mtr_close_kg
          if (total.trsf_mtr_opn_amb && item.trsf_mtr_opn_amb && 
            _.toNumber(total.trsf_mtr_opn_amb) > _.toNumber(item.trsf_mtr_opn_amb)) {
            total.trsf_mtr_opn_amb = item.trsf_mtr_opn_amb;
          }
          if (total.trsf_mtr_cls_amb && item.trsf_mtr_cls_amb && 
            _.toNumber(total.trsf_mtr_cls_amb) < _.toNumber(item.trsf_mtr_cls_amb)) {
            total.trsf_mtr_cls_amb = item.trsf_mtr_cls_amb;
          }
          if (total.trsf_mtr_opn_cor && item.trsf_mtr_opn_cor && 
            _.toNumber(total.trsf_mtr_opn_cor) > _.toNumber(item.trsf_mtr_opn_cor)) {
            total.trsf_mtr_opn_cor = item.trsf_mtr_opn_cor;
          }
          if (total.trsf_mtr_cls_cor && item.trsf_mtr_cls_cor && 
            _.toNumber(total.trsf_mtr_cls_cor) < _.toNumber(item.trsf_mtr_cls_cor)) {
            total.trsf_mtr_cls_cor = item.trsf_mtr_cls_cor;
          }
          if (total.trsf_mtr_open_kg && item.trsf_mtr_open_kg && 
            _.toNumber(total.trsf_mtr_open_kg) > _.toNumber(item.trsf_mtr_open_kg)) {
            total.trsf_mtr_open_kg = item.trsf_mtr_open_kg;
          }
          if (total.trsf_mtr_close_kg && item.trsf_mtr_close_kg && 
            _.toNumber(total.trsf_mtr_close_kg) < _.toNumber(item.trsf_mtr_close_kg)) {
            total.trsf_mtr_close_kg = item.trsf_mtr_close_kg;
          }
          totals[index] = total;
          itemExisted = true;
        }
      }
      if (!itemExisted) {
        totals.push(item);
      }
    });
    console.log('MeterTotals: adjustMeterTotals - end', totals);

    return totals;
  } */

  const getMeters = () => {
    setLoading(true);

    const meters = buildMeterTransfers(productArms, transfers);

    setLoading(false);
    if (!dataLoaded || !dataLoaded?.meter_totals || dataLoaded?.meter_totals?.length === 0) {
      setData(adjustMeterTotals(meters));
    } else {
      setData(dataLoaded?.meter_totals);
      // const loaded = _.clone(dataLoaded);
      // loaded.meter_totals = [];
      // // setDataLoaded(loaded);
      // console.log('MT 6 - MeterTotals: data are loaded!');
    }
  }

  useEffect(() => {
    getMeters();
  }, [transfers, productArms, dataLoaded]);

  useEffect(() => {
    if (data) {
      // console.log('MeterTotals: data changed and do setFieldsValue. Data:', data);
      form.setFieldsValue({
        meter_totals: data,
      });
      setDataRendered(true);
    }
  }, [data]);

  useEffect(() => {
    let board = dataBoard;
    if (!board) {
      board = {};
    }
    board.meter_totals = data;
    setDataBoard(board);
  }, [data]);

  useEffect(() => {
    if (data?.length > 0) {
      // console.log("MeterTotals: sourceType changed", sourceType);
      setData([]);
    }
  }, [sourceType]);

  return (
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="meter_totals">
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

export default MeterTotals;
