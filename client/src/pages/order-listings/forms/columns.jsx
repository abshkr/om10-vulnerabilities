import _ from 'lodash';

const columns = (t, pageState, form, units) => [
  {
    headerName: t('fields.oitemOrderId'),
    field: 'oitem_order_id',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
  },
  {
    headerName: t('fields.oitemProdCode'),
    field: 'oitem_prod_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: false,
    width: 100,
  },
  {
    headerName: t('fields.oitemProdCmpy'),
    field: 'oitem_prod_cmpy',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
  },
  {
    headerName: t('fields.oitemProdName'),
    field: 'oitem_prod_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: false,
    width: 150,
  },
  {
    headerName: t('fields.oitemDrwrName'),
    field: 'oitem_drwr_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 150,
  },
  {
    headerName: t('fields.oitemProdQty'),
    field: 'oitem_prod_qty',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: (pageState==='detail'? false : true),
    width: 100,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      ranges: {
        max: 999999999,
        min: 0,
      },
    },
  },
  {
    headerName: t('fields.oitemProdUnit'),
    field: 'oitem_prod_unit',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: (pageState==='detail'? false : true),
    width: 130,
    //cellEditor: 'UnitEditor',
    //cellEditorParams: {
    //  values: units?.records,
    //  form: form,
    //},
    cellRenderer: 'ListRenderer',
    cellRendererParams: {
      //values: _.uniq(_.map(units?.records, (item)=>{return String(item.unit_id)+'|'+item.description;}))
      values: _.uniq(_.map(units?.records, (item)=>{return {code: _.toNumber(item.unit_id), name: item.description};}))
    },
    cellEditor: 'ListEditor',
    cellEditorParams: {
      //values: _.uniq(_.map(units?.records, (item)=>{return String(item.unit_id)+'|'+item.description;}))
      values: _.uniq(_.map(units?.records, (item)=>{return {code: _.toNumber(item.unit_id), name: item.description};}))
    }
  },
  {
    headerName: t('fields.oitemUnitName'),
    field: 'oitem_unit_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 80,
  },
  {
    headerName: t('fields.oitemByPacks'),
    field: 'oitem_by_packs',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    cellRenderer: 'BooleanRenderer',
    width: 80,
  },
  {
    headerName: t('fields.oitemPackSize'),
    field: 'oitem_pack_size',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: (pageState==='detail'? false : true),
    editable: false,
    width: 60,
  },
  {
    headerName: t('fields.oitemSchdQty'),
    field: 'oitem_schd_qty',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: false,
    width: 160,
    cellRenderer: 'TwinQuantityRenderer',
    cellRendererParams: {
      colorAvail: '#009900',
      colorUsed: '#C80000',
    },
},
  {
    headerName: t('fields.oitemLoadQty'),
    field: 'oitem_load_qty',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: false,
    width: 160,
    cellRenderer: 'TwinQuantityRenderer',
    cellRendererParams: {
      colorAvail: '#009900',
      colorUsed: '#C80000',
    },
  },
  {
    headerName: t('fields.oitemDelvQty'),
    field: 'oitem_delv_qty',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: false,
    width: 160,
    cellRenderer: 'TwinQuantityRenderer',
    cellRendererParams: {
      colorAvail: '#009900',
      colorUsed: '#C80000',
    },
  },
  {
    headerName: t('fields.oitemExemptNo'),
    field: 'oitem_exempt_no',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
  },
  {
    headerName: t('fields.oitemPadjCode'),
    field: 'oitem_padj_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
  },
  {
    headerName: t('fields.oitemPadjName'),
    field: 'oitem_padj_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
  },
  {
    headerName: t('fields.oitemPriceType'),
    field: 'oitem_price_type',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
  },
  {
    headerName: t('fields.oitemPriceName'),
    field: 'oitem_price_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
  },
  {
    headerName: t('fields.oitemProdPrice'),
    field: 'oitem_prod_price',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
  },
  {
    headerName: t('fields.oitemPeriodNo'),
    field: 'oitem_period_no',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
  },
  {
    headerName: t('fields.oitemLineNo'),
    field: 'oitem_line_no',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
  },
  {
    headerName: t('fields.oitemPeriods'),
    field: 'oitem_periods',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
  },
];

export default columns;
