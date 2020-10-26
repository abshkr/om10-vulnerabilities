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

  const onCellUpdate = (value) => {
    console.log('MeterTransfers: onCellUpdate', value);
    // console.log('MeterTransfers: onCellUpdate2', value?.colDef?.field, value?.colDef?.headerName, value?.value, value?.newValue, value?.data.trsf_cmpt_capacit);

    /* injector_or_meter: arm?.meter_type_code,
    trsf_mtr_cd: arm?.stream_mtrcode,
    trsf_mtr_typ: `${arm?.meter_type_code} - ${arm?.meter_type_desc}`,
    trsf_cmpt_no: cmptNo, */

    let current = form.getFieldValue('meter_transfers');
    console.log('MeterTransfers: onCellUpdate', current);

    const index = _.findIndex(current, (o) => (
      o.trsf_cmpt_no === value?.data?.trsf_cmpt_no &&
      o.trsf_mtr_cd === value?.data?.trsf_mtr_cd
    ));
    current[index][value.colDef.field] = value?.value;

    setData(current);

    if ( value?.colDef?.field === 'trsf_mtr_opn_amb' || 
      value?.colDef?.field === 'trsf_mtr_opn_cor' || 
      value?.colDef?.field === 'trsf_mtr_open_kg' || 
      value?.colDef?.field === 'trsf_mtr_cls_amb' || 
      value?.colDef?.field === 'trsf_mtr_cls_cor' ||
      value?.colDef?.field === 'trsf_mtr_close_kg') {
    }
  };

  useEffect(() => {
    function getMeters() {
      setLoading(true);

      const meters = buildMeterTransfers(productArms, transfers);

      console.log('MeterTransfers: dataLoaded!', dataLoaded);
      setLoading(false);
      if (!dataLoaded || !dataLoaded?.meter_transfers || dataLoaded?.meter_transfers?.length === 0) {
        setData(meters);
        console.log('MT 5 - MeterTransfers: data are built!');
      } else {
        setData(dataLoaded.meter_transfers);
        // const loaded = _.clone(dataLoaded);
        // loaded.meter_transfers = [];
        // // setDataLoaded(loaded);
        console.log('MT 5 - MeterTransfers: data are loaded!');
      }
    }

    getMeters();
  }, [transfers, productArms, dataLoaded]);

  useEffect(() => {
    if (data) {
      // console.log('MeterTransfers: Data changed and do setFieldsValue. Data:', data);
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
      // console.log("MeterTransfers: sourceType changed", sourceType);
      setData([]);
    }
  }, [sourceType]);

  return (
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="meter_transfers">
        <DataTable 
          minimal={true}
          data={data} 
          // data={data.filter((o)=>(o?.trsf_cmpt_no === selected?.trsf_cmpt_no))} 
          height="70vh" 
          columns={fields} 
          editType={false}
          onCellUpdate={(value) => onCellUpdate(value)}
        />
      </Form.Item>
    </Spin>
  );
};

export default MeterTransfers;
