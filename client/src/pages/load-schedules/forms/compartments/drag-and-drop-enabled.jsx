import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Row, Col } from 'antd';
import _ from 'lodash';

import { DataTable, PartnershipManager, OrderManager } from '../../../../components';

import api, { LOAD_SCHEDULES } from '../../../../api';

import { ProductEditor, UnitEditor, ScheduleEditor, PreloadEditor, DelvNoEditor } from './fields';

import useSWR from 'swr';

const Compartments = ({ form, value, tanker, drawer, supplier, customer, config }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();
  const IS_CREATING = !value;

  const { data: units } = useSWR(LOAD_SCHEDULES.UNIT_TYPES);

  const [compartments, setCompartments] = useState([]);
  const [products, setProducts] = useState([]);
  const [tableAPI, setTableAPI] = useState(null);

  // this section is for debugging purpose
  // useEffect(() => {
  //   console.log('xxxxxxxxxxxxxxxxxx products', products);
  // }, [products]);

  useEffect(() => {
    setCompartments([]);
    setProducts([]);
    // console.log('yyyyyyyyyyyyyyyyyy products, value', products, value);

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
    // this seems the place that caused the disappearance of product list
    // IS_CREATING could be true even in EDIT mode when the form is just opened, because "value" is NULL or undefined then
    // and the drawer is also undefined. API will return nothing when it is called with undefined drawer/customer
    // if (IS_CREATING) {
    // So we add one more check on drawer here - only calls API when drawer is not NULL and IS_CREATING is true,
    // which will never happen in EDIT_MODE, so the issue is solved.
    if (IS_CREATING && drawer) {
      api
        .get(LOAD_SCHEDULES.DRAWER_PRODUCTS, {
          params: config?.site_customer_product
            ? {
                drawer_code: drawer,
                customer: value ? value.shls_cust : customer,
              }
            : {
                drawer_code: drawer,
              },
        })
        .then((res) => {
          setProducts(res.data.records);
          // console.log('zzzzzzzzzzzzzzzzzzz res.data.records, value', res.data.records, IS_CREATING, drawer, tanker, customer);
        });
    }
  }, [drawer, tanker, customer]);

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
          params: config?.site_customer_product
            ? {
                drawer_code: value.supplier_code,
                customer: value ? value.shls_cust : customer,
              }
            : {
                drawer_code: value.supplier_code,
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

    /* console.log('....................111preload check', preloaded, scheduled, current[values.rowIndex]);
    // check preload qty and make sure it does not exceed scheduled
    const preloaded = current[values.rowIndex].qty_preload;
    if (_.toNumber(preloaded) > scheduled) {
      current[values.rowIndex].qty_preload = scheduled;
      console.log('....................preload check', preloaded, scheduled, current[values.rowIndex]);
    } */

    setCompartments([]);
    setCompartments(current);
  };

  const onDragFinished = (index, value) => {
    const payload = [];

    const rowNode = tableAPI.getRowNode(index);
    const data = rowNode.data;

    const productCode = value?.prod_code || '';
    const productName = value?.prod_name || '';

    const quantityScheduled = !value?.prod_code
      ? value?.qty_scheduled
      : value.qty_scheduled > 0
      ? value?.qty_scheduled
      : parseInt(data.safefill);

    tableAPI.forEachNodeAfterFilterAndSort((rowNode, tableIndex) => {
      if (tableIndex === index) {
        payload.push({
          ...rowNode.data,
          prod_code: productCode,
          prod_name: productName,
          qty_scheduled: quantityScheduled,
        });
      } else {
        payload.push(rowNode.data);
      }
    });

    tableAPI.updateRowData({ update: payload });

    form.setFieldsValue({
      compartments: payload,
    });

    setCompartments(payload);
  };

  const fields = [
    {
      headerName: t('fields.equipment'),
      field: 'eqpt_code',
      resizable: true,
      width: 130,
      suppressSizeToFit: true,
      pinned: 'left',
    },

    {
      headerName: t('fields.compartment'),
      field: 'compartment',
      resizable: true,
      width: 130,
      suppressSizeToFit: true,
      pinned: 'left',
    },

    {
      headerName: t('fields.code'),
      field: 'prod_code',
      resizable: true,
      width: 120,
      suppressSizeToFit: true,
    },

    {
      headerName: t('fields.product'),
      field: 'prod_name',
      resizable: true,
      width: 300,
      suppressSizeToFit: true,
      editable: false,
      cellRenderer: 'DraggableRenderer',

      cellRendererParams: {
        onDragFinished,
        compartments,
        t,
      },
    },

    {
      headerName: t('fields.schedule'),
      field: 'qty_scheduled',
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      editable: true,
      cellClass: 'editable-ag-grid-cell',
      cellEditor: 'ScheduleEditor',
      cellEditorParams: {
        min: 0,
        max: 15000,
        form: form,
      },
    },

    {
      headerName: t('fields.unit'),
      field: 'unit_name',
      resizable: true,
      width: 90,
      suppressSizeToFit: true,
      editable: true,
      cellClass: 'editable-ag-grid-cell',
      cellEditor: 'UnitEditor',
      cellEditorParams: {
        values: units?.records || [],
        form: form,
      },
    },

    {
      headerName: t('fields.orderNo'),
      field: 'order_id',
      resizable: true,
      width: 110,
      suppressSizeToFit: true,
      hide: true,
    },

    {
      headerName: t('fields.orderNo'),
      field: 'order_cust_ordno',
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
      editable: config?.accessOpenOrderFromSchdules,
      cellClass: config?.accessOpenOrderFromSchdules ? 'editable-ag-grid-cell' : '',
      cellEditor: 'InputPopupEditor',
      cellEditorParams: {
        form: form,
        grid: 'compartments',
        columnPairs: [
          'order_cust_ordno:order_cust_ordno',
          'oitem_order_id:order_id',
          'oitem_prod_code:prod_code',
          'oitem_prod_name:prod_name',
          'qty_left:qty_scheduled',
        ],
        tableAPI: tableAPI,
        // maxLength: 20,
        t,
        width: '90vw',
        height: '90vh',
        popupDisabled: !supplier,
        popupManager: OrderManager,
        popupTitle: t('descriptions.schdOrderTitle'),
        popupParams: {
          order_supp_code: supplier,
        },
      },
    },

    {
      headerName: t('fields.safeFill'),
      field: 'safefill',
      resizable: true,
      width: 110,
      suppressSizeToFit: true,
    },

    {
      headerName: t('fields.preloaded'),
      field: 'qty_preload',
      resizable: true,
      width: 90,
      suppressSizeToFit: true,
      editable: true,
      cellClass: 'editable-ag-grid-cell',
      cellEditor: 'PreloadEditor',
      cellEditorParams: {
        min: 0,
        max: 999999,
        form: form,
      },
      /* cellEditor: 'NumericEditor',
      cellEditorParams: {
        ranges: {
          max: 999999999,
          min: 0,
        },
        t,
      },*/
    },

    {
      headerName: t('fields.prevProduct'),
      field: 'prev_prod_name',
      resizable: true,
      width: 140,
      suppressSizeToFit: true,
    },

    {
      headerName: t('fields.soldTo'),
      field: 'schd_sold_to_num',
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
      editable: true,
      cellClass: 'editable-ag-grid-cell',
      // cellEditor: 'SoldToEditor',
      // cellEditorParams: {
      //   values: soldTo?.records.filter((o)=>(o.partner_cmpy_code === supplier)) || [],
      //   form: form,
      // },
      cellEditor: 'InputPopupEditor',
      cellEditorParams: {
        form: form,
        grid: 'compartments',
        columnPairs: '',
        tableAPI: tableAPI,
        maxLength: 20,
        t,
        popupDisabled: !supplier,
        popupManager: PartnershipManager,
        popupTitle: t('fields.soldTo') + ' - ' + t('pageNames.partnership'),
        popupParams: {
          partner_code: '',
          partner_type: 'AG',
          partner_cmpy_code: supplier,
          partner_cust_acct: '',
        },
      },
    },

    {
      headerName: t('fields.shipTo'),
      field: 'schd_ship_to_num',
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
      editable: true,
      cellClass: 'editable-ag-grid-cell',
      // cellEditor: 'ShipToEditor',
      // cellEditorParams: {
      //   values: shipTo?.records.filter((o)=>(o.partner_cmpy_code === supplier)) || [],
      //   form: form,
      // },
      cellEditor: 'InputPopupEditor',
      cellEditorParams: {
        form: form,
        grid: 'compartments',
        columnPairs: '',
        tableAPI: tableAPI,
        maxLength: 20,
        t,
        popupDisabled: !supplier,
        popupManager: PartnershipManager,
        popupTitle: t('fields.shipTo') + ' - ' + t('pageNames.partnership'),
        popupParams: {
          partner_code: '',
          partner_type: 'WE',
          partner_cmpy_code: supplier,
          partner_cust_acct: '',
        },
      },
    },

    {
      headerName: t('fields.delvNo'),
      field: 'schd_deliv_num',
      resizable: true,
      width: 90,
      editable: true,
      cellClass: 'editable-ag-grid-cell',
      suppressSizeToFit: true,
      cellEditor: 'DelvNoEditor',
      cellEditorParams: {
        form: form,
      },
    },
  ];

  const productFields = [
    {
      headerName: t('fields.productCode'),
      field: 'prod_code',
      resizable: true,
      suppressSizeToFit: true,
      pinned: 'left',
      width: 125,
      dndSource: true,
    },

    {
      headerName: t('fields.productName'),
      field: 'prod_name',
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  const components = {
    ProductEditor,
    UnitEditor,
    ScheduleEditor,
    PreloadEditor,
    DelvNoEditor,
  };

  return (
    <Row gutter={[8, 8]}>
      <Col flex={1}>
        <DataTable data={products} columns={productFields} parentHeight="320px" minimal />
      </Col>
      <Col flex={4}>
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
      </Col>
    </Row>
  );
};

export default Compartments;
