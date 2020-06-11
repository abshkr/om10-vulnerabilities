import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';
import { MANUAL_TRANSACTIONS } from '../../../../api';

const BaseProductTotals = ({ form, type, selected }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fields = columns(t);

  useEffect(() => {
    async function getMeters() {
      const pre = [];
      const transfers = form.getFieldValue('transfers');
      setLoading(true);

      for (let index = 0; index < transfers?.length; index++) {
        const transfer = transfers[index];

        if (!transfer?.trsf_arm_cd.includes(' ')) {
          await axios
            .get(MANUAL_TRANSACTIONS.BASE_DETAILS, {
              params: {
                prod_cmpy: transfer?.trsf_prod_cmpy,
                prod_code: transfer?.trsf_prod_code,
                arm_code: [transfer?.trsf_arm_cd],
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
                    trsf_bs_temp_tot: null,
                    trsf_bs_qty_amb_tot: _.sumBy(transfers, (o) => {
                      if (o?.trsf_prod_code === product?.rat_prod_prodcode) {
                        return o?.trsf_qty_amb; //????
                      } else {
                        return 0;
                      }
                    }),
                    trsf_bs_qty_cor_tot: _.sumBy(res?.data?.records, (o) => {
                      return o.trsf_qty_cor; //????
                    }),
                    trsf_bs_load_kg_tot: _.sumBy(res?.data?.records, (o) => {
                      return o.trsf_load_kg; //????
                    }),
                    is_updated: false,
                  });
                });
              }
            });
        }
      }

      setLoading(false);
      setData(pre);
    }

    getMeters();
  }, [selected]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        bases: data,
      });
    }
  }, [data]);

  return (
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="bases">
        <DataTable data={data} height="80vh" columns={fields} />
      </Form.Item>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <div style={{ marginRight: 20 }}>
          <strong>Base Obsered Total: {500}</strong>
        </div>
      </div>
    </Spin>
  );
};

export default BaseProductTotals;
