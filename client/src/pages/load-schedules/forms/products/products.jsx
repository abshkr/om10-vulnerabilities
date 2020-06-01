import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Form } from 'antd';
import axios from 'axios';

import { DataTable } from '../../../../components';
import columns from './columns';
import { Unit, Schedule } from './fields';

import { LOAD_SCHEDULES } from '../../../../api';

const components = {
  UnitEditor: Unit,
  ScheduleEditor: Schedule,
};

const Products = ({ value, form }) => {
  const { t } = useTranslation();
  const { data: units } = useSWR(LOAD_SCHEDULES.UNIT_TYPES);

  const [data, setData] = useState([]);

  const fields = columns(t, form, units);

  useEffect(() => {
    if (value) {
      axios
        .get(LOAD_SCHEDULES.PRODUCTS, {
          params: {
            supplier_code: value.supplier_code,
            shls_trip_no: value.shls_trip_no,
          },
        })
        .then((res) => {
          const payload = res?.data?.records;

          setData(payload);

          form.setFieldsValue({
            products: payload,
          });
        });
    }
  }, [value]);

  return (
    <Form.Item name="products" noStyle>
      <DataTable data={data} columns={fields} parentHeight="350px" components={components} minimal />
    </Form.Item>
  );
};

export default Products;
