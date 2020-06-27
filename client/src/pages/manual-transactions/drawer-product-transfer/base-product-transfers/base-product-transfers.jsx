import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin, Row, Col } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';
import { MANUAL_TRANSACTIONS } from '../../../../api';
import {calcBaseRatios} from '../../../../utils'

const BaseProductTransfers = ({
  form, 
  dataBoard,
  setDataBoard,
  sourceType, 
  selected, 
  transfers,
  clicked,
  setChildTableAPI,
  baseSummary
}) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [obsTotal, setObsTotal] = useState(0);
  const [stdTotal, setStdTotal] = useState(0);
  const [massTotal, setMassTotal] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const fields = columns(t);

  const getBaseTransfers = async () => {
    const pre = [];
    //const transfers = form.getFieldValue('transfers');
    setLoading(true);

    for (let index = 0; index < transfers?.length; index++) {
      const transfer = transfers[index];

      if (selected?.trsf_cmpt_no !== transfer?.trsf_cmpt_no) {
        //continue;
      }

      if (!transfer?.trsf_arm_cd.includes(' ')) {
        await axios
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
    }

    setLoading(false);
    setData(pre);
  };

  useEffect(() => {
    getBaseTransfers();
  }, [selected]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        base_transfers: data,
      });
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
    console.log('baseSummary changed on data and clicked', clicked);
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
  }, [data, clicked]);

  useEffect(() => {
    const item = baseSummary?.filter((o)=>(o?.cmpt === clicked?.trsf_cmpt_no))?.[0];
    console.log('baseSummary changed', clicked);
    console.log('baseSummary changed', baseSummary);
    console.log('baseSummary changed', item);

    if (item) {
      setObsTotal(item.amb);
      setStdTotal(item.cor);
      setMassTotal(item.kg);
    } else {
      setObsTotal(0);
      setStdTotal(0);
      setMassTotal(0);
    }
  }, [baseSummary]);

  useEffect(() => {
    console.log("base-transfers sourceType", sourceType);
    setData([]);
  }, [sourceType]);

  return (
    <>
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="base_transfers">
        <DataTable 
          data={data.filter((o)=>(o?.trsf_bs_cmpt_no === clicked?.trsf_cmpt_no))} 
          height="70vh" 
          columns={fields} 
          apiContext={setChildTableAPI}
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
