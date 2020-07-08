import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin, Row, Col } from 'antd';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';
import api, { MANUAL_TRANSACTIONS } from '../../../../api';
import {calcBaseRatios} from '../../../../utils'

const BaseProductTotals = ({ 
  form, 
  sourceType, 
  selected, 
  transfers,
  clicked,
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

  const sumBaseTotals = (totals) => {
    const obs = _.sumBy(totals, 'trsf_bs_qty_amb_tot');
    const std = _.sumBy(totals, 'trsf_bs_qty_cor_tot');
    const mass = _.sumBy(totals, 'trsf_bs_load_kg_tot');
    setObsTotal(obs);
    setStdTotal(std);
    setMassTotal(mass);
  };

  const adjustBaseTotals = (items) => {
    const totals = [];
    console.log('BaseProductTotals: adjustBaseTotals - start', items);
    let itemExisted = false;

    _.forEach(items, (item) => {
      itemExisted = false;
      for (let index = 0; index < totals.length; index++) {
        const total = totals[index];
        if (total.trsf_bs_prodcd_tot === item.trsf_bs_prodcd_tot && total.trsf_bs_tk_cd_tot === item.trsf_bs_tk_cd_tot) {
          total.trsf_bs_qty_amb_tot = _.toNumber(total.trsf_bs_qty_amb_tot) + _.toNumber(item.trsf_bs_qty_amb_tot);
          total.trsf_bs_qty_cor_tot = _.toNumber(total.trsf_bs_qty_cor_tot) + _.toNumber(item.trsf_bs_qty_cor_tot);
          total.trsf_bs_load_kg_tot = _.toNumber(total.trsf_bs_load_kg_tot) + _.toNumber(item.trsf_bs_load_kg_tot);
          total.trsf_bs_temp_tot = null;
          totals[index] = total;
          itemExisted = true;
        }
      }
      if (!itemExisted) {
        totals.push(item);
      }
    });
    console.log('BaseProductTotals: adjustBaseTotals - end', totals);

    // adjust sum totals
    sumBaseTotals(totals);
    /* const obs = _.sumBy(totals, 'trsf_bs_qty_amb_tot');
    const std = _.sumBy(totals, 'trsf_bs_qty_cor_tot');
    const mass = _.sumBy(totals, 'trsf_bs_load_kg_tot');
    setObsTotal(obs);
    setStdTotal(std);
    setMassTotal(mass); */

    return totals;
  }

  const getBaseTotals = async () => {
    const pre = [];
    //const transfers = form.getFieldValue('transfers');
    setLoading(true);

    for (let index = 0; index < transfers?.length; index++) {
      const transfer = transfers[index];

      if (!transfer?.trsf_arm_cd.includes(' ')) {
        await api
          .get(MANUAL_TRANSACTIONS.BASE_DETAILS, {
            params: {
              prod_cmpy: transfer?.trsf_prod_cmpy,
              prod_code: transfer?.trsf_prod_code,
              //arm_code: [transfer?.trsf_arm_cd],
              arm_code: transfer?.trsf_arm_cd,
              id: 'bpttl',
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
                  trsf_bs_prodcd_tot: product?.stream_basecode,
                  trsf_bs_prodname_tot: `${product?.stream_basecode} - ${product.stream_basename}`,
                  trsf_bs_tk_cd_tot: product?.stream_tankcode,
                  trsf_bs_prodcls_tot: product.stream_bclass_nmae,
                  trsf_bs_den_tot: product?.stream_tankden,
                  trsf_bs_temp_tot: transfer?.trsf_temp,
                  trsf_bs_qty_amb_tot: calcBaseRatios(transfer?.trsf_qty_amb, product?.ratio_value, ratio_total),
                  trsf_bs_qty_cor_tot: calcBaseRatios(transfer?.trsf_qty_cor, product?.ratio_value, ratio_total),
                  trsf_bs_load_kg_tot: calcBaseRatios(transfer?.trsf_load_kg, product?.ratio_value, ratio_total),
                  trsf_bs_adtv_flag_tot: product?.adtv_flag,
                  trsf_bs_ratio_value_tot: product?.ratio_value,
                  trsf_bs_ratio_total_tot: ratio_total,
                  trsf_bs_ratio_total2_tot: product?.ratio_total,
                  is_updated: false,
                });
              });
            }
          });
      }
    }

    setLoading(false);
    if (dataLoadFlag === 0) {
      setData(adjustBaseTotals(pre));
    } else {
      if (dataLoadFlag === 1) {
        setData(dataLoaded.base_totals);
        sumBaseTotals(dataLoaded.base_totals);
        setDataLoadFlag(2);
        console.log('MT 4 - BaseTotals: data are loaded!', dataLoadFlag);
      }
    }
  };

  useEffect(() => {
    //if (dataLoadFlag === 0) {
      getBaseTotals();
    //}
  }, [selected]);

  useEffect(() => {
    if (data) {
      console.log('BaseProductTotals: data changed and do setFieldsValue. Data:', data);
      form.setFieldsValue({
        base_totals: data,
      });
      setDataRendered(true);
    }
  }, [data]);

  /* useEffect(() => {
    if (dataLoadFlag === 1 && dataLoaded && dataRendered===true) {
      console.log('BaseProductTotals: Load data by setData. dataLoadFlag:', dataLoadFlag);
      setData(dataLoaded?.base_totals);
      setDataLoadFlag(2);
      setDataRendered(false);
      console.log('MT 4 - BaseProductTotals: data are loaded!', dataLoadFlag);
    }
  }, [dataLoadFlag, dataLoaded, dataRendered]); */

  useEffect(() => {
    let board = dataBoard;
    if (!board) {
      board = {};
    }
    board.base_totals = data;
    setDataBoard(board);
  }, [data]);

  useEffect(() => {
    console.log('BaseProductTotals: base quantity totals changed on clicked', clicked);
    getBaseTotals();
  }, [clicked]);

  /* useEffect(() => {
    console.log('BaseProductTotals: base quantity totals changed on data and clicked', clicked);
    if (data) {
      const obs = _.sumBy(data, 'trsf_bs_qty_amb_tot');
      const std = _.sumBy(data, 'trsf_bs_qty_cor_tot');
      const mass = _.sumBy(data, 'trsf_bs_load_kg_tot');
      setObsTotal(obs);
      setStdTotal(std);
      setMassTotal(mass);
    } else {
      setObsTotal(0);
      setStdTotal(0);
      setMassTotal(0);
    }
  }, [data, clicked]); */

  useEffect(() => {
    if (data?.length > 0) {
      console.log("BaseProductTotals: sourceType changed", sourceType);
      setData([]);
    }
  }, [sourceType]);

  return (
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="base_totals">
        <DataTable 
          minimal={true}
          data={data} 
          height="70vh" 
          columns={fields} 
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
  );
};

export default BaseProductTotals;
