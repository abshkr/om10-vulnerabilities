import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';
import { MANUAL_TRANSACTIONS } from '../../../../api';
import {calcBaseRatios} from '../../../../utils'

const BaseProductTransfers = ({
  form, 
  sourceType, 
  selected, 
  transfers 
}) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fields = columns(t);

  const getBaseTransfers = async () => {
    const pre = [];
    //const transfers = form.getFieldValue('transfers');
    setLoading(true);

    for (let index = 0; index < transfers?.length; index++) {
      const transfer = transfers[index];

      if (selected?.trsf_cmpt_no !== transfer?.trsf_cmpt_no) {
        continue;
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
              _.forEach(res?.data?.records, (product) => {
                pre.push({
                  trsf_bs_prodcd: product?.stream_basecode,
                  trsf_bs_prodname: `${product?.stream_basecode} - ${product.stream_basename}`,
                  trsf_bs_tk_cd: product?.stream_tankcode,
                  trsf_bs_prodcls: product.stream_bclass_nmae,
                  trsf_bs_den: product?.stream_tankden,
                  trsf_bs_temp: null,
                  trsf_bs_qty_amb: calcBaseRatios(transfer?.trsf_qty_amb, product?.ratio_value, product?.ratio_total),
                  trsf_bs_qty_cor: calcBaseRatios(transfer?.trsf_qty_cor, product?.ratio_value, product?.ratio_total),
                  trsf_bs_load_kg: calcBaseRatios(transfer?.trsf_load_kg, product?.ratio_value, product?.ratio_total),
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
        base_totals: data,
      });
    }
  }, [data]);

  useEffect(() => {
    console.log("base-transfers sourceType", sourceType);
    setData([]);
  }, [sourceType]);

  return (
    <>
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="base_transfers">
        <DataTable data={data} height="80vh" columns={fields} />
      </Form.Item>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <div style={{ marginRight: 20 }}>
          <strong>Base Observed Total: {500}</strong>
        </div>
      </div>
    </Spin>
    </>
  );
};

export default BaseProductTransfers;