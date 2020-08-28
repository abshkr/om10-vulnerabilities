import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { DataTable } from '../../../../components';

import api, { LOAD_SCHEDULES } from '../../../../api';
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
  const IS_CREATING = !value;

  const { data: soldTo } = useSWR(LOAD_SCHEDULES.SOLD_TO);
  const { data: shipTo } = useSWR(LOAD_SCHEDULES.SHIP_TO);
  const { data: units } = useSWR(LOAD_SCHEDULES.UNIT_TYPES);

  const [compartments, setCompartments] = useState([]);
  const [products, setProducts] = useState([]);

  const fields = columns(t, form, products, soldTo, shipTo, units, drawer);

  const components = {
    ProductEditor,
    UnitEditor,
    ScheduleEditor,
    DelvNoEditor,
    SoldToEditor,
    ShipToEditor,
  };

  useEffect(() => {
    setCompartments([]);
    setProducts([]);

    if (value) {
      api
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
    if (IS_CREATING) {
      api
      .get(LOAD_SCHEDULES.DRAWER_PRODUCTS, {
        params: {
          drawer_code: drawer,
        },
      })
      .then((res) => setProducts(res.data.records));
    }
  }, [drawer, tanker]);

  useEffect(() => {
    setCompartments([]);
    setProducts([]);

    if (!value && tanker) {
      api
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

    if (!IS_CREATING) {
      api
      .get(LOAD_SCHEDULES.DRAWER_PRODUCTS, {
        params: {
          drawer_code: value.drawer_code,
        },
      })
      .then((res) => setProducts(res.data.records));
    }
  }, [value, tanker, setFieldsValue]);

  const rowEditingStopped = (values) => {
    // console.log(values)
    
    const current = form.getFieldValue('compartments');
    let scheduled = current[values.rowIndex].qty_scheduled;
    if (parseInt(scheduled) === 0 && current[values.rowIndex].prod_code !== "") {
      scheduled = parseInt(current[values.rowIndex].safefill);
    } else if (current[values.rowIndex].prod_code === "" || !current[values.rowIndex].prod_code) {
      scheduled = 0;
    }
    current[values.rowIndex].qty_scheduled = scheduled;
    setCompartments([]);
    setCompartments(current);
  };

  return (
    <Form.Item name="compartments">
      <DataTable 
        data={compartments} 
        columns={fields} 
        parentHeight="320px" 
        components={components} 
        minimal 
        // editType='fullRow'
        rowEditingStopped={rowEditingStopped}
      />
    </Form.Item>
  );
};

export default Compartments;
