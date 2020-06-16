import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin, Row, Col } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';
import { MANUAL_TRANSACTIONS } from '../../../../api';
import {calcBaseRatios} from '../../../../utils'

const BaseProductTotals = ({ 
  form, 
  sourceType, 
  selected, 
  transfers 
}) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fields = columns(t);

  const adjustBaseTotals = (items) => {
    const totals = [];
    console.log('adjustBaseTotals', items);
    let itemExisted = false;

    _.forEach(items, (item) => {
      itemExisted = false;
      for (let index = 0; index < totals.length; index++) {
        const total = totals[index];
        if (total.trsf_bs_prodcd_tot === item.trsf_bs_prodcd_tot && total.trsf_bs_tk_cd_tot === item.trsf_bs_tk_cd_tot) {
          total.trsf_bs_qty_amb_tot = _.toNumber(total.trsf_bs_qty_amb_tot) + _.toNumber(item.trsf_bs_qty_amb_tot);
          total.trsf_bs_qty_cor_tot = _.toNumber(total.trsf_bs_qty_cor_tot) + _.toNumber(item.trsf_bs_qty_cor_tot);
          total.trsf_bs_load_kg_tot = _.toNumber(total.trsf_bs_load_kg_tot) + _.toNumber(item.trsf_bs_load_kg_tot);
          totals[index] = total;
          itemExisted = true;
        }
      }
      if (!itemExisted) {
        totals.push(item);
      }
    });
    console.log('adjustBaseTotals', totals);

    return totals;
  }

  const getBaseTotals = async () => {
    const pre = [];
    //const transfers = form.getFieldValue('transfers');
    setLoading(true);

    for (let index = 0; index < transfers?.length; index++) {
      const transfer = transfers[index];

      if (!transfer?.trsf_arm_cd.includes(' ')) {
        await axios
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
              _.forEach(res?.data?.records, (product) => {
                pre.push({
                  trsf_bs_prodcd_tot: product?.stream_basecode,
                  trsf_bs_prodname_tot: `${product?.stream_basecode} - ${product.stream_basename}`,
                  trsf_bs_tk_cd_tot: product?.stream_tankcode,
                  trsf_bs_prodcls_tot: product.stream_bclass_nmae,
                  trsf_bs_den_tot: product?.stream_tankden,
                  trsf_bs_temp_tot: transfer?.trsf_temp,
                  trsf_bs_qty_amb_tot: calcBaseRatios(transfer?.trsf_qty_amb, product?.ratio_value, product?.ratio_total),
                  trsf_bs_qty_cor_tot: calcBaseRatios(transfer?.trsf_qty_cor, product?.ratio_value, product?.ratio_total),
                  trsf_bs_load_kg_tot: calcBaseRatios(transfer?.trsf_load_kg, product?.ratio_value, product?.ratio_total),
                  /* trsf_bs_qty_amb_tot: _.sumBy(transfers, (o) => {
                    if (o?.trsf_prod_code === product?.rat_prod_prodcode) {
                      return calcBaseRatios(o?.trsf_qty_amb, product?.ratio_value, product?.ratio_total); //????
                    } else {
                      return 0;
                    }
                  }),
                  trsf_bs_qty_cor_tot: _.sumBy(res?.data?.records, (o) => {
                    if (o?.trsf_prod_code === product?.rat_prod_prodcode) {
                      return calcBaseRatios(o?.trsf_qty_cor, product?.ratio_value, product?.ratio_total); //????
                    } else {
                      return 0;
                    }
                  }),
                  trsf_bs_load_kg_tot: _.sumBy(res?.data?.records, (o) => {
                    if (o?.trsf_prod_code === product?.rat_prod_prodcode) {
                      return calcBaseRatios(o?.trsf_load_kg, product?.ratio_value, product?.ratio_total); //????
                    } else {
                      return 0;
                    }
                  }), */
                  is_updated: false,
                });
              });
            }
          });
      }
    }

    setLoading(false);
    setData(adjustBaseTotals(pre));
    //setData(pre);
  };

  useEffect(() => {
    getBaseTotals();
  }, [selected]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        base_totals: data,
      });
    }
  }, [data]);

  useEffect(() => {
    console.log("base-totals sourceType", sourceType);
    setData([]);
  }, [sourceType]);

  return (
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="base_totals">
        <DataTable 
          data={data} 
          height="70vh" 
          columns={fields} 
        />
      </Form.Item>

      <Row gutter={[8,8]}>
        <Col span={9}>
        </Col>
        <Col span={5}>
          <strong>{t('fields.nomtranObsTotal')} {_.round(_.sumBy(data, 'trsf_bs_qty_amb_tot'), 3)}</strong>
        </Col>
        <Col span={5}>
          <strong>{t('fields.nomtranStdTotal')} {_.round(_.sumBy(data, 'trsf_bs_qty_cor_tot'), 3)}</strong>
        </Col>
        <Col span={5}>
          <strong>{t('fields.nomtranMassTotal')} {_.round(_.sumBy(data, 'trsf_bs_load_kg_tot'), 3)}</strong>
        </Col>
      </Row>
    </Spin>
  );
};

export default BaseProductTotals;
