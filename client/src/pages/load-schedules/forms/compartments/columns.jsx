// const columns = (t, form, products, soldTo, shipTo, units, supplier) => [
const columns = (t, form, products, units, supplier, PartnershipManager, tableAPI) => [
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
    /* editable: true,
    cellClass: 'editable-ag-grid-cell',
    cellEditor: 'InputPopupEditor',
    cellEditorParams: {
      form: form,
      grid: 'compartments',
      name: '',
      tableAPI: tableAPI,
      // maxLength: 20,
      t,
      popupDisabled: !supplier,
      popupManager: PartnershipManager,
      popupTitle: t('fields.orderNo') + ' - ' + t('pageNames.orderListing'),
      popupParams: {
        // order_supp_code: supplier,
        partner_code: '',
        partner_type: 'AG',
        partner_cmpy_code: supplier,
        partner_cust_acct: ''
      },
    }, */
  },

  {
    headerName: t('fields.safeFill'),
    field: 'safefill',
    resizable: true,
    width: 110,
    suppressSizeToFit: true,
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
      name: '',
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
        partner_cust_acct: ''
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
      name: '',
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
        partner_cust_acct: ''
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

export default columns;
