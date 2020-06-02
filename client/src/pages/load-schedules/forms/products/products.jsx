import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Form } from 'antd';
import axios from 'axios';

import { Unit, Schedule } from './fields';
import { DataTable } from '../../../../components';
import columns from './columns';
import transform from './transform';

import { LOAD_SCHEDULES } from '../../../../api';

const components = {
  UnitEditor: Unit,
  ScheduleEditor: Schedule,
};

const Products = ({ value, form, drawer }) => {
  const { t } = useTranslation();
  const { data: units } = useSWR(LOAD_SCHEDULES.UNIT_TYPES);

  const [data, setData] = useState([]);

  const { setFieldsValue } = form;

  const fields = columns(t, form, units);

  useEffect(() => {
    if (drawer) {
      axios
        .get(LOAD_SCHEDULES.DRAWER_PRODUCTS, {
          params: {
            drawer_code: drawer,
          },
        })
        .then((res) => {
          const payload = transform(res?.data?.records);

          setData(payload);

          setFieldsValue({
            products: payload,
          });
        });
    }
  }, [drawer, setFieldsValue]);

  return (
    <Form.Item name="products" noStyle>
      <DataTable data={data} columns={fields} parentHeight="350px" components={components} minimal />
    </Form.Item>
  );
};

export default Products;
