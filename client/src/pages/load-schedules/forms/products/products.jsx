import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Form } from 'antd';
import api from 'api';

import { Unit, Schedule, ProductRender } from './fields';
import { DataTable } from '../../../../components';
import columns from './columns';
import transform from './transform';

import { LOAD_SCHEDULES } from '../../../../api';

const components = {
  UnitEditor: Unit,
  ScheduleEditor: Schedule,
  ProductRender: ProductRender
};

const Products = ({ value, form, drawer, access }) => {
  const { t } = useTranslation();
  const { data: units } = useSWR(LOAD_SCHEDULES.UNIT_TYPES);

  const [data, setData] = useState([]);

  const { setFieldsValue } = form;

  const fields = columns(t, form, units, access);

  useEffect(() => {
    setData([]);
    if (drawer && !value && units) {
      api
        .get(LOAD_SCHEDULES.DRAWER_PRODUCTS, {
          params: {
            drawer_code: drawer,
          },
        })
        .then((res) => {
          const payload = transform(res?.data?.records, units);

          setData(payload);

          setFieldsValue({
            products: payload,
          });
        });
    }
  }, [drawer, value, units, setFieldsValue]);

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

          setData(payload);

          setFieldsValue({
            products: payload,
          });
        });
    }
  }, [value, units, setFieldsValue]);

  return (
    <Form.Item name="products" noStyle>
      <DataTable 
        data={data} 
        columns={fields} 
        parentHeight="320px" 
        components={components} 
        minimal
        editType='fullRow'
      />
    </Form.Item>
  );
};

export default Products;
