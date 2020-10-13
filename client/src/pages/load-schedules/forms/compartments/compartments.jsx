import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Row, Col } from 'antd';
import _ from 'lodash';

import { DataTable, PartnershipManager, OrderManager } from '../../../../components';

import api, { LOAD_SCHEDULES } from '../../../../api';
import columns from './columns';
import productColumns from './product-column';

import { ProductEditor, UnitEditor, ScheduleEditor, DelvNoEditor } from './fields';

import useSWR from 'swr';

const Compartments = ({ form, value, tanker, drawer, supplier, config }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();
  const IS_CREATING = !value;

  const { data: units } = useSWR(LOAD_SCHEDULES.UNIT_TYPES);

  const [compartments, setCompartments] = useState([]);
  const [products, setProducts] = useState([]);
  const [tableAPI, setTableAPI] = useState(null);

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
  }, [value, tanker, setFieldsValue, setCompartments]);

  const rowEditingStopped = (values) => {
    // console.log(values)

    const current = form.getFieldValue('compartments');
    let scheduled = current[values.rowIndex].qty_scheduled;

    if (parseInt(scheduled) === 0 && current[values.rowIndex].prod_code !== '') {
      scheduled = parseInt(current[values.rowIndex].safefill);
    } else if (current[values.rowIndex].prod_code === '' || !current[values.rowIndex].prod_code) {
      scheduled = 0;
    }
    current[values.rowIndex].qty_scheduled = scheduled;
    setCompartments([]);
    setCompartments(current);
  };

  const onDragFinished = (index, value) => {
    const payload = [];

    const rowNode = tableAPI.getRowNode(index);
    const data = rowNode.data;

    console.log('.......onDragFinished', index, value, data);

    rowNode.setDataValue('prod_code', value?.prod_code);

    rowNode.setDataValue('prod_name', value?.prod_name);

    if (!value?.prod_code) {
      rowNode.setDataValue('qty_scheduled', value?.qty_scheduled);
    } else {
      rowNode.setDataValue(
        'qty_scheduled',
        value?.qty_scheduled > 0 ? value?.qty_scheduled : parseInt(data.safefill)
      );
    }

    tableAPI.forEachNodeAfterFilterAndSort((rowNode, index) => {
      payload.push(rowNode.data);
    });

    form.setFieldsValue({
      compartments: payload,
    });

    console.log(payload);

    setCompartments(payload);
  };

  const fields = columns(
    t,
    form,
    products,
    units,
    supplier,
    PartnershipManager,
    OrderManager,
    tableAPI,
    config,
    onDragFinished,
    compartments
  );

  const productFields = productColumns(t);

  const components = {
    ProductEditor,
    UnitEditor,
    ScheduleEditor,
    DelvNoEditor,
  };

  return (
    <Form.Item name="compartments">
      <DataTable
        data={compartments}
        columns={fields}
        parentHeight="320px"
        components={components}
        minimal
        apiContext={setTableAPI}
        rowEditingStopped={rowEditingStopped}
      />
    </Form.Item>
  );
};

export default Compartments;

{
  /* <Row gutter={[8, 8]}>
<Col flex={1}>
  <DataTable data={products} columns={productFields} parentHeight="320px" minimal />
</Col>
<Col flex={4}>
  <DataTable
    data={compartments}
    columns={fields}
    parentHeight="320px"
    components={components}
    minimal
    apiContext={setTableAPI}
    rowEditingStopped={rowEditingStopped}
  />
</Col>
</Row> */
}

// const onDragFinished = (index, value) => {
//   const payload = [];

//   const rowNode = tableAPI.getRowNode(index);
//   const data = rowNode.data;

//   const productCode = value?.prod_code || '';
//   const productName = value?.prod_name || '';

//   const quantityScheduled = !value?.prod_code
//     ? value?.qty_scheduled
//     : value.qty_scheduled > 0
//     ? value?.qty_scheduled
//     : parseInt(data.safefill);

//   tableAPI.forEachNodeAfterFilterAndSort((rowNode, tableIndex) => {
//     if (tableIndex === index) {
//       payload.push({
//         ...rowNode.data,
//         prod_code: productCode,
//         prod_name: productName,
//         qty_scheduled: quantityScheduled,
//       });
//     } else {
//       payload.push(rowNode.data);
//     }
//   });

//   tableAPI.updateRowData({ update: payload });

//   form.setFieldsValue({
//     compartments: payload,
//   });

//   setCompartments(payload);
// };
