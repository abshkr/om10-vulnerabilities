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
  dataLoadFlag,
  setDataLoadFlag,
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

  const getBaseTransfers = (selected) => {
    // const pre = [];
    //const transfers = form.getFieldValue('transfers');
    setLoading(true);

    const pre = buildBaseTransfers(productArms, transfers);

    /* for (let index = 0; index < transfers?.length; index++) {
      const transfer = transfers[index];

      if (selected?.trsf_cmpt_no !== transfer?.trsf_cmpt_no) {
        //continue;
      }

      if (!transfer?.trsf_arm_cd.includes(' ')) {
        await api
          .get(MANUAL_TRANSACTIONS.BASE_DETAILS, {
            params: {
              prod_cmpy: transfer?.trsf_prod_cmpy,
              prod_code: transfer?.trsf_prod_code,
              //arm_code: [transfer?.trsf_arm_cd],
              arm_code: transfer?.trsf_arm_cd,
              id: 'bptrsf',
            },
          })
          .then((res) => {
            if (res.data?.records?.length > 0) {
              const sum_ratios = _.sumBy(res?.data?.records, (o)=>{return _.toNumber(o.ratio_value)});
              _.forEach(res?.data?.records, (product) => {
                let ratio_total = product?.ratio_total;
                if (_.toNumber(ratio_total) > sum_ratios) {
                  ratio_total = String(sum_ratios);
                }
                pre.push({
                  trsf_bs_cmpt_no: transfer?.trsf_cmpt_no,
                  trsf_bs_prodcd: product?.stream_basecode,
                  trsf_bs_prodname: `${product?.stream_basecode} - ${product.stream_basename}`,
                  trsf_bs_tk_cd: product?.stream_tankcode,
                  trsf_bs_prodcls: product.stream_bclass_nmae,
                  trsf_bs_den: product?.stream_tankden,
                  trsf_bs_temp: transfer?.trsf_temp,
                  trsf_bs_qty_amb: calcBaseRatios(transfer?.trsf_qty_amb, product?.ratio_value, ratio_total),
                  trsf_bs_qty_cor: calcBaseRatios(transfer?.trsf_qty_cor, product?.ratio_value, ratio_total),
                  trsf_bs_load_kg: calcBaseRatios(transfer?.trsf_load_kg, product?.ratio_value, ratio_total),
                  trsf_bs_adtv_flag: product?.adtv_flag,
                  trsf_bs_ratio_value: product?.ratio_value,
                  trsf_bs_ratio_total: ratio_total,
                  trsf_bs_ratio_total2: product?.ratio_total,
                  is_updated: false,
                });
              });
            }
          });
      }
    } */

    setLoading(false);

    let tranbases = undefined;
    if (dataLoadFlag === 1) {
      tranbases = _.clone(dataLoaded.base_transfers);
      setDataLoadFlag(2);
      console.log('MT 3 - BaseProductTransfers: data are loaded!', dataLoadFlag);
    } else {
      tranbases = _.clone(pre);
      console.log('MT 3 - BaseProductTransfers: normal data!', dataLoadFlag);
    }

    const obs = _.sumBy(tranbases.filter((o)=>(o?.trsf_bs_cmpt_no === selected?.trsf_cmpt_no)), 'trsf_bs_qty_amb');
    const std = _.sumBy(tranbases.filter((o)=>(o?.trsf_bs_cmpt_no === selected?.trsf_cmpt_no)), 'trsf_bs_qty_cor');
    const mass = _.sumBy(tranbases.filter((o)=>(o?.trsf_bs_cmpt_no === selected?.trsf_cmpt_no)), 'trsf_bs_load_kg');
    setObsTotal(obs);
    setStdTotal(std);
    setMassTotal(mass);

    setData(tranbases);
  };

  useEffect(() => {
    //if (dataLoadFlag === 0) {
      getBaseTransfers(selected);
    //}
  }, [selected, transfers, productArms]);

  useEffect(() => {
    if (data) {
      console.log('BaseProductTransfers: data changed and do setFieldsValue. Data:', data);
      form.setFieldsValue({
        base_transfers: data,
      });
      setDataRendered(true);
    }
  }, [data]);

  /* useEffect(() => {
    if (dataLoadFlag === 1 && dataLoaded && dataRendered===true) {
      console.log('BaseProductTransfers: Load data by setData. dataLoadFlag', dataLoadFlag);
      setData(dataLoaded?.base_transfers);
      setDataLoadFlag(2);
      setDataRendered(false);
      console.log('MT 3 - BaseProductTransfers: data are loaded!', dataLoadFlag);
    }
  }, [dataLoadFlag, dataLoaded, dataRendered]); */

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
      {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <div style={{ marginRight: 20 }}>
          <strong>Base Observed Total: {500}</strong>
        </div>
      </div> */}
    </Spin>
    </>
  );
};

export default BaseProductTransfers;
