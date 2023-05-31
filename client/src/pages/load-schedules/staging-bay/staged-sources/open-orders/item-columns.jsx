import _ from 'lodash';

const columns = (t, pageState, form, units) => [
  {
    headerName: t('fields.oitemOrderId'),
    field: 'order_id',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
  },
  {
    headerName: t('fields.oitemProdCode'),
    field: 'prod_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: false,
    width: 100,
    dndSource: true,
  },
  {
    headerName: t('fields.oitemProdCmpy'),
    field: 'prod_cmpy',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
  },
  {
    headerName: t('fields.oitemProdName'),
    field: 'prod_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: false,
    width: 150,
  },
  /*{
    headerName: t('fields.oitemDrwrName'),
    field: 'oitem_drwr_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 150,
  },*/
  {
    headerName: t('fields.oitemProdQty'),
    field: 'oitem_prod_qty',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: pageState === 'detail' ? false : true,
    cellClass: pageState !== 'detail' ? 'editable-ag-grid-cell' : '',
    width: 100,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      ranges: {
        max: 999999999,
        min: 0,
      },
      t,
    },
  },
  {
    headerName: t('fields.oitemProdUnit'),
    field: 'unit_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: pageState === 'detail' ? false : true,
    cellClass: pageState !== 'detail' ? 'editable-ag-grid-cell' : '',
    width: 130,
    cellRenderer: 'ListRenderer',
    cellRendererParams: {
      values: _.uniq(
        _.map(units?.records, (item) => {
          return { code: _.toNumber(item.unit_id), name: item.description };
        })
      ),
    },
    cellEditor: 'ListEditor',
    cellEditorParams: {
      values: _.uniq(
        _.map(units?.records, (item) => {
          return { code: _.toNumber(item.unit_id), name: item.description };
        })
      ),
    },
  },
  {
    headerName: t('fields.oitemUnitName'),
    field: 'unit_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 80,
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
];

export default columns;
