import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin, Row, Col } from 'antd';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';
import api, { MANUAL_TRANSACTIONS } from '../../../../api';
import {calcBaseRatios} from '../../../../utils'

import { buildBaseTransfers, buildBaseTotals } from '../../data-builder';

const BaseProductTransfers = ({
  form, 
  sourceType, 
  selected, 
  transfers,
  productArms,
  clicked,
  updating,
  setUpdating,
  setChildTableAPI,
  dataBoard,
  setDataBoard,
  data,
  setData,
  dataLoaded,
  setDataLoaded,
}) => {
  const { t } = useTranslation();

  const [obsTotal, setObsTotal] = useState(0);
  const [stdTotal, setStdTotal] = useState(0);
  const [massTotal, setMassTotal] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [dataRendered, setDataRendered] = useState(false);

  const fields = columns(t);

  const sumBaseTotals = (tranbases, selected) => {
    const obs = _.sumBy(tranbases.filter((o)=>(o?.trsf_bs_cmpt_no === selected?.trsf_cmpt_no)), 'trsf_bs_qty_amb');
    const std = _.sumBy(tranbases.filter((o)=>(o?.trsf_bs_cmpt_no === selected?.trsf_cmpt_no)), 'trsf_bs_qty_cor');
    const mass = _.sumBy(tranbases.filter((o)=>(o?.trsf_bs_cmpt_no === selected?.trsf_cmpt_no)), 'trsf_bs_load_kg');
    setObsTotal(obs);
    setStdTotal(std);
    setMassTotal(mass);
  };

  const getBaseTransfers = (selected) => {
    setLoading(true);

    const pre = buildBaseTransfers(productArms, transfers);

    setLoading(false);

    // let tranbases = [];
    if (!dataLoaded || !dataLoaded?.base_transfers || dataLoaded?.base_transfers?.length === 0) {
      // tranbases = _.clone(pre);
      setData(pre);
      sumBaseTotals(pre, selected);
      console.log('MT 3 - BaseProductTransfers: normal data!');
    } else {
      // tranbases = _.clone(dataLoaded.base_transfers);
      setData(dataLoaded.base_transfers);
      sumBaseTotals(dataLoaded.base_transfers, selected);
      const loaded = _.clone(dataLoaded);
      loaded.base_transfers = [];
      setDataLoaded(loaded);
      console.log('MT 3 - BaseProductTransfers: data are loaded!');
    }
  };

  useEffect(() => {
    getBaseTransfers(selected);
  }, [selected, transfers, productArms, dataLoaded]);

  useEffect(() => {
    if (data) {
      console.log('BaseProductTransfers: data changed and do setFieldsValue. Data:', data);
      form.setFieldsValue({
        base_transfers: data,
      });
      setDataRendered(true);
    }
  }, [data]);

  useEffect(() => {
    let board = dataBoard;
    if (!board) {
      board = {};
    }
    board.base_transfers = data;
    setDataBoard(board);
  }, [data]);

  useEffect(() => {
    console.log('BaseProductTransfers: base quantity totals changed on data and clicked', clicked);
    if (data) {
      const obs = _.sumBy(data.filter((o)=>(o?.trsf_bs_cmpt_no === clicked?.trsf_cmpt_no)), 'trsf_bs_qty_amb');
      const std = _.sumBy(data.filter((o)=>(o?.trsf_bs_cmpt_no === clicked?.trsf_cmpt_no)), 'trsf_bs_qty_cor');
      const mass = _.sumBy(data.filter((o)=>(o?.trsf_bs_cmpt_no === clicked?.trsf_cmpt_no)), 'trsf_bs_load_kg');
      setObsTotal(obs);
      setStdTotal(std);
      setMassTotal(mass);
    } else {
      setObsTotal(0);
      setStdTotal(0);
      setMassTotal(0);
    }
    setUpdating(false)
  }, [data, clicked]);

  useEffect(() => {
    if (data?.length > 0) {
      console.log("BaseProductTransfers: sourceType changed.", sourceType);
      setData([]);
    }
  }, [sourceType]);

  const onCellUpdate = (value) => {
    console.log('BaseProductTransfers: onCellUpdate', value);

    const bases = _.clone(data);
    let index=0;
    for (index=0; index<bases.length; index++) {
      const base = bases[index];
      if (base.trsf_bs_cmpt_no === value?.data?.trsf_bs_cmpt_no && 
        base.trsf_bs_prodcd === value?.data?.trsf_bs_prodcd &&
        base.trsf_bs_tk_cd === value?.data?.trsf_bs_tk_cd 
        ) {
        if (
          value?.colDef?.field === 'trsf_bs_den' || 
          value?.colDef?.field === 'trsf_bs_qty_amb'
        ) {
          bases[index] = value?.data;
          setData(bases);
        }
        break;
      }
    }
    //setChildTableAPI.updateRowData({ update: [base] });

    /* console.log('DrawerProductTransfers: onCellUpdate2', value?.colDef?.field, value?.colDef?.headerName, value?.value, value?.newValue, value?.data.trsf_cmpt_capacit);
    if (
      value?.colDef?.field === 'trsf_qty_amb' || 
      value?.colDef?.field === 'trsf_qty_cor' ||
      value?.colDef?.field === 'trsf_load_kg' 
    ) {
      if (_.toNumber(value?.newValue) > _.toNumber(value?.data.trsf_cmpt_capacit)) {
        notification.error({
          message: t('validate.outOfRange'),
          description: value?.colDef?.headerName + ': ' + value?.newValue + ', ' + 
          t('fields.compartment') + ' ' + t('fields.capacity') + ': ' + value?.data.trsf_cmpt_capacit,
        });
      }
    }
    setSelected({
      ...value?.data,
    }); */
  };

  return (
    <>
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="base_transfers">
        <DataTable 
          // isLoading={updating}
          isLoading={updating}
          minimal={true}
          data={data.filter((o)=>(o?.trsf_bs_cmpt_no === clicked?.trsf_cmpt_no))} 
          height="70vh" 
          columns={fields} 
          apiContext={setChildTableAPI}
          onCellUpdate={(value) => onCellUpdate(value)}
          editType={false}
        />
      </Form.Item>

      <Row gutter={[8,8]}>
        <Col span={9}>
        </Col>
        <Col span={5}>
          <strong>{t('fields.nomtranObsTotal')} {_.round(obsTotal, 3)}</strong>
        </Col>
        <Col span={5}>
          <strong>{t('fields.nomtranStdTotal')} {_.round(stdTotal, 3)}</strong>
        </Col>
        <Col span={5}>
          <strong>{t('fields.nomtranMassTotal')} {_.round(massTotal, 3)}</strong>
        </Col>
      </Row>
    </Spin>
    </>
  );
};

export default BaseProductTransfers;
