import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Form } from 'antd';
import api from 'api';
import _ from 'lodash';

import { Unit, Schedule, ProductRender } from './fields';
import { DataTable } from '../../../../components';
import columns from './columns';
import transform from './transform';

import { LOAD_SCHEDULES } from '../../../../api';

const components = {
  UnitEditor: Unit,
  ScheduleEditor: Schedule,
  ProductRender: ProductRender,
};

const Products = ({ value, form, drawer, customer, access, setInit }) => {
  const { t } = useTranslation();
  const { data: units } = useSWR(LOAD_SCHEDULES.UNIT_TYPES);

  const [data, setData] = useState([]);

  const { setFieldsValue } = form;

  const fields = columns(t, form, units, access);

  // Because we use:
  //    customer={site_customer_product ? customer : undefined}
  // when customer === undefined, the site confoguration must be off

  useEffect(() => {
    setData([]);
    if (drawer && !value && units) {
      api
        .get(LOAD_SCHEDULES.DRAWER_PRODUCTS, {
          params: {
            drawer_code: drawer,
            customer: value ? (!customer ? undefined : value.shls_cust) : customer,
          },
        })
        .then((res) => {
          const payload = transform(res?.data?.records, units);

          setData(payload);
          if (setInit) {
            setInit(payload);
          }

          setFieldsValue({
            products: payload,
          });
        });
    }
  }, [drawer, value, units, setFieldsValue, customer]);

  useEffect(() => {
    setData([]);
    if (value && units) {
      api
        .get(LOAD_SCHEDULES.PRODUCTS, {
          params: {
            supplier_code: value.supplier_code,
            shls_trip_no: value.shls_trip_no,
          },
        })
        .then((res) => {
          const payload = transform(res?.data?.records, units);

          if (value.shls_cust && customer) {
            api
              .get(LOAD_SCHEDULES.DRAWER_PRODUCTS, {
                params: {
                  drawer_code: value.drawer_code,
                  customer: value.shls_cust,
                },
              })
              .then((res) => {
                const cust_prods = res?.data?.records;

                const filtered = _.filter(payload, (item) => {
                  for (let i = 0; i < cust_prods.length; i += 1) {
                    if (item.prod_code === cust_prods[i].prod_code) {
                      return true;
                    }
                  }
                  return false;
                });
                setData(filtered);
                if (setInit) {
                  setInit(filtered);
                }

                setFieldsValue({
                  products: filtered,
                });
              });
          } else {
            setData(payload);
            if (setInit) {
              setInit(payload);
            }

            setFieldsValue({
              products: payload,
            });
          }
        });
    }
  }, [value, units, setFieldsValue, customer]);

  return (
    <Form.Item name="products" noStyle>
      <DataTable
        data={data}
        columns={fields}
        parentHeight="320px"
        components={components}
        minimal
        editType="fullRow"
      />
    </Form.Item>
  );
};

export default Products;
