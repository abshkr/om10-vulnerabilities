import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import _ from 'lodash';

import { DataTable } from '../../../../../components';

import api, { LOAD_SCHEDULES } from '../../../../../api';

import { ProductEditor, UnitEditor, ScheduleEditor, PreloadEditor } from './fields';

import useSWR from 'swr';

const Compartments = ({ form, value, tanker, products, units }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: compartmentsPayload } = useSWR(
    value ? `${LOAD_SCHEDULES.COMPARTMENTS_BY_TANKER}?tnkr_code=${tanker}` : null
  );

  const [compartments, setCompartments] = useState([]);
  const [tableAPI, setTableAPI] = useState(null);

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

  useEffect(() => {
    if (value && compartmentsPayload) {
      setCompartments(compartmentsPayload.records);
      setFieldsValue({
        compartments: compartmentsPayload.records,
      });
    }
  }, [value, compartmentsPayload, setFieldsValue]);

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
      headerName: t('fields.equipment'),
      field: 'eqpt_id',
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      hide: true,
    },
    {
      headerName: t('fields.compartment'),
      field: 'eqpt_cmpt',
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
      hide: true,
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
      editable: true,
      cellClass: 'editable-ag-grid-cell',
      cellEditor: 'ProductEditor',

      cellEditorParams: {
        values: products,
        form: form,
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
      editable: false,
      hide: true,
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
      editable: false,
      hide: true,
    },

    {
      headerName: t('fields.shipTo'),
      field: 'schd_ship_to_num',
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
      editable: false,
      hide: true,
    },

    {
      headerName: t('fields.delvNo'),
      field: 'schd_deliv_num',
      resizable: true,
      width: 90,
      editable: false,
      hide: true,
    },
  ];

  const components = {
    ProductEditor,
    UnitEditor,
    ScheduleEditor,
    PreloadEditor,
  };

  return (
    <Form.Item name="compartments">
      <DataTable
        data={compartments}
        columns={fields}
        parentHeight={compartments?.length > 0 ? `${compartments?.length * 25 + 90}px` : '135px'}
        components={components}
        minimal
        apiContext={setTableAPI}
        rowEditingStopped={rowEditingStopped}
      />
    </Form.Item>
  );
};

export default Compartments;
