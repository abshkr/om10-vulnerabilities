import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import columns from './columns';
import { MANUAL_TRANSACTIONS } from '../../../../api';

const ProductQuantities = ({ form, type, selected, transfers }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fields = columns(t);

  useEffect(() => {
    async function getMeters() {
      const products = [];

      setLoading(true);

      for (let index = 0; index < transfers.length; index++) {
        const transfer = transfers[index];

        if (!transfer?.arm_code.includes(' ')) {
          await axios
            .get(MANUAL_TRANSACTIONS.BASE_DETAILS, {
              params: {
                prod_cmpy: transfer?.prod_cmpy,
                prod_code: transfer?.prod_code,
                arm_code: [transfer?.arm_code],
              },
            })
            .then((res) => {
              if (res.data?.records?.length > 0) {
                _.forEach(res?.data?.records, (product) => {
                  products.push({
                    product: `${product?.stream_basecode} - ${product.stream_basename}`,
                    tank_code: product?.stream_tankcode,
                    stream_bclass_nmae: product.stream_bclass_nmae,
                    dens: product?.stream_tankden,
                    temperature: null,
                    amb_vol: null,
                    cor_vol: null,
                    liq_kg: null,
                    is_updated: false,
                  });
                });
              }
            });
        }
      }

      setLoading(false);
      setData(products);
    }

    getMeters();
  }, [selected, transfers]);

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

export default ProductQuantities;
