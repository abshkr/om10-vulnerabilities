import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin } from 'antd';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';
import api, { MANUAL_TRANSACTIONS } from '../../../../api';

const MeterTotals = ({ 
  form, 
  sourceType, 
  selected, 
  transfers,
  dataBoard,
  setDataBoard,
  data,
  setData,
  dataLoadFlag,
  setDataLoadFlag,
  dataLoaded,
  setDataLoaded,
}) => {
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(true);
  const [dataRendered, setDataRendered] = useState(false);

  const fields = columns(t);

  const adjustMeterTotals = (items) => {
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
          if (!total.trsf_mtr_opn_amb && !item.trsf_mtr_opn_amb && 
            _.toNumber(total.trsf_mtr_opn_amb) > _.toNumber(item.trsf_mtr_opn_amb)) {
            total.trsf_mtr_opn_amb = item.trsf_mtr_opn_amb;
          }
          if (!total.trsf_mtr_cls_amb && !item.trsf_mtr_cls_amb && 
            _.toNumber(total.trsf_mtr_cls_amb) < _.toNumber(item.trsf_mtr_cls_amb)) {
            total.trsf_mtr_cls_amb = item.trsf_mtr_cls_amb;
          }
          if (!total.trsf_mtr_opn_cor && !item.trsf_mtr_opn_cor && 
            _.toNumber(total.trsf_mtr_opn_cor) > _.toNumber(item.trsf_mtr_opn_cor)) {
            total.trsf_mtr_opn_cor = item.trsf_mtr_opn_cor;
          }
          if (!total.trsf_mtr_cls_cor && !item.trsf_mtr_cls_cor && 
            _.toNumber(total.trsf_mtr_cls_cor) < _.toNumber(item.trsf_mtr_cls_cor)) {
            total.trsf_mtr_cls_cor = item.trsf_mtr_cls_cor;
          }
          if (!total.trsf_mtr_open_kg && !item.trsf_mtr_open_kg && 
            _.toNumber(total.trsf_mtr_open_kg) > _.toNumber(item.trsf_mtr_open_kg)) {
            total.trsf_mtr_open_kg = item.trsf_mtr_open_kg;
          }
          if (!total.trsf_mtr_close_kg && !item.trsf_mtr_close_kg && 
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
  }

  const getMeters = async () => {
    const meters = [];

    setLoading(true);

    for (let index = 0; index < transfers.length; index++) {
      const transfer = transfers[index];

      if (!transfer?.trsf_arm_cd.includes(' ')) {
        await api
          .get(MANUAL_TRANSACTIONS.BASE_DETAILS, {
            params: {
              prod_cmpy: transfer?.trsf_prod_cmpy,
              prod_code: transfer?.trsf_prod_code,
              //arm_code: [transfer?.trsf_arm_cd],
              arm_code: transfer?.trsf_arm_cd,
              id: 'mtrttl'
            },
          })
          .then((res) => {
            if (res.data?.records?.length > 0) {
              _.forEach(res?.data?.records, (arm) => {
                meters.push({
                  trsf_mtr_opn_amb: null,
                  trsf_mtr_opn_cor: null,
                  trsf_mtr_open_kg: null,
                  trsf_mtr_cls_amb: null,
                  trsf_mtr_cls_cor: null,
                  trsf_mtr_close_kg: null,
                  injector_or_meter: arm?.meter_type_code,
                  trsf_mtr_cd: arm.stream_mtrcode,
                  trsf_mtr_typ: `${arm.meter_type_code} - ${arm?.meter_type_desc}`,
                  //trsf_cmpt_no: transfer.trsf_cmpt_no,  //????
                });
              });
            }
          });
      }
    }

    setLoading(false);
    if (dataLoadFlag === 0) {
      setData(adjustMeterTotals(meters));
    } else {
      if (dataLoadFlag === 1) {
        setData(dataLoaded?.meter_totals);
        setDataLoadFlag(2);
        console.log('MT 6 - MeterTotals: data are loaded!', dataLoadFlag);
      }
    }
  }

  useEffect(() => {
    //if (dataLoadFlag === 0) {
      getMeters();
    //}
  }, [selected, transfers]);

  useEffect(() => {
    if (data) {
      console.log('MeterTotals: data changed and do setFieldsValue. Data:', data);
      form.setFieldsValue({
        meter_totals: data,
      });
      setDataRendered(true);
    }
  }, [data]);

  /* useEffect(() => {
    if (dataLoadFlag === 1 && dataLoaded && dataRendered===true) {
      console.log('MeterTotals: Load data by setData. dataLoadFlag:', dataLoadFlag);
      setData(dataLoaded?.meter_totals);
      setDataLoadFlag(2);
      setDataRendered(false);
      console.log('MT 6 - MeterTotals: data are loaded!', dataLoadFlag);
    }
  }, [dataLoadFlag, dataLoaded, dataRendered]); */

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
      console.log("MeterTotals: sourceType changed", sourceType);
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
