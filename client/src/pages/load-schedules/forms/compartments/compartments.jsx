import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { DataTable } from '../../../../components';
import axios from 'axios';

import { LOAD_SCHEDULES } from '../../../../api';
import columns from './columns';

import {
  ProductEditor,
  UnitEditor,
  ScheduleEditor,
  DelvNoEditor,
  SoldToEditor,
  ShipToEditor,
} from './fields';

import useSWR from 'swr';

const Compartments = ({ form, value, tanker, drawer }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: soldTo } = useSWR(LOAD_SCHEDULES.SOLD_TO);
  const { data: shipTo } = useSWR(LOAD_SCHEDULES.SHIP_TO);
  const { data: units } = useSWR(LOAD_SCHEDULES.UNIT_TYPES);

  const [compartments, setCompartments] = useState([]);
  const [products, setProducts] = useState([]);

  const fields = columns(t, form, products, soldTo, shipTo, units);

  const components = {
    ProductEditor,
    UnitEditor,
    ScheduleEditor,
    DelvNoEditor,
    SoldToEditor,
    ShipToEditor,
  };

  useEffect(() => {
    if (value) {
      axios
        .get(LOAD_SCHEDULES.COMPARTMENTS, {
          params: {
            shls_trip_no: value.shls_trip_no,
            supplier_code: value.supplier_code,
          },
        })
        .then((res) => {
          setCompartments(res.data.records);

          setFieldsValue({
            compartments: res.data.records,
          });
        });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    axios
      .get(LOAD_SCHEDULES.DRAWER_PRODUCTS, {
        params: {
          drawer_code: drawer,
        },
      })
      .then((res) => setProducts(res.data.records));
  }, [drawer]);

  useEffect(() => {
    if (!value && tanker) {
      axios
        .get(LOAD_SCHEDULES.COMPARTMENTS_BY_TANKER, {
          params: {
            tnkr_code: tanker,
          },
        })
        .then((res) => {
          setCompartments(res.data.records);

          setFieldsValue({
            compartments: res.data.records,
          });
        });
    }
  }, [value, tanker, setFieldsValue]);

  return (
    <Form.Item name="compartments">
      <DataTable data={compartments} columns={fields} parentHeight="400px" components={components} minimal />
    </Form.Item>
  );
};

export default Compartments;
