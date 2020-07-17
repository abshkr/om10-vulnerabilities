const columns = (t, form, sourceType, loadType, loadNumber, setPayload, payload, products, composition) => [
  {
    headerName: t('fields.compartmentNumber'),
    field: 'trsf_cmpt_no',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 50,
    pinned: 'left',
  },

  // (!sourceType || !loadNumber || (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT')) &&
  // (!sourceType || !loadNumber || (sourceType === 'SCHEDULE' && loadType !== 'BY_COMPARTMENT')) &&
  // (!sourceType || !loadNumber || (sourceType === 'OPENORDER')) &&
  {
    headerName: t('fields.soldTo'),
    field: 'trsf_sold_to',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide:
      !sourceType ||
      !loadNumber ||
      (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT') ||
      sourceType === 'OPENORDER',
    width: 100,
  },

  {
    headerName: t('fields.deliverNumber'),
    field: 'trsf_delv_num',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: sourceType === 'SCHEDULE' ? false : true,

    cellClass: sourceType !== 'SCHEDULE' ? 'selected-editable-ag-grid-cell' : '',

    hide: !sourceType || !loadNumber || (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT'),
    width: 100,
  },

  {
    headerName: t('fields.shipTo'),
    field: 'trsf_delv_loc',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide:
      !sourceType ||
      !loadNumber ||
      (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT') ||
      sourceType === 'OPENORDER',
    width: 100,
  },

  {
    headerName: t('fields.equipmentId'),
    field: 'trsf_equip_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    cellEditor: 'EquipmentEditor',
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    cellEditorParams: {
      values: composition?.records?.filter((o)=>(o.cmpt_count>0)) || [],
    },
  },

  {
    headerName: t('fields.drawerCode'),
    field: 'trsf_drwr_cd',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
  },

  {
    headerName: t('fields.drawerProduct'),
    field: 'trsf_prod_code',
    width: sourceType === 'SCHEDULE' && loadType === 'BY_COMPARTMENT' ? 200 : 360,
    hide: true,
  },

  {
    headerName: t('fields.company'),
    field: 'trsf_prod_cmpy',
    hide: true,
  },

  {
    headerName: t('fields.drawerProduct'),
    field: 'trsf_prod_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    cellEditor: 'DrawerProductsEditor',
    editable: !(sourceType === 'SCHEDULE' && loadType === 'BY_COMPARTMENT'),
    cellClass: 'editable-ag-grid-cell',
    width:
      !sourceType || !loadNumber || (sourceType === 'SCHEDULE' && loadType === 'BY_COMPARTMENT') ? 200 : 400,
    cellEditorParams: {
      values: products?.records || [],
      form,
      payload,
      setPayload,
      t,
    },
  },

  {
    headerName: t('fields.bayArm'),
    field: 'trsf_arm_cd',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 250,
    cellEditor: 'BayArmEditor',
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    cellEditorParams: {
      values: [],
      form,
      payload,
      setPayload,
    },
  },

  {
    headerName: t('fields.scheduled'),
    field: 'trsf_qty_plan',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
    hide:
      !sourceType ||
      !loadNumber ||
      (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT') ||
      sourceType === 'OPENORDER',
    width: 120,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '100',
    },
  },
  {
    headerName: t('fields.oprdProdQty'),
    field: 'trsf_qty_left',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
    hide:
      !sourceType ||
      !loadNumber ||
      (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT') ||
      sourceType === 'OPENORDER',
    width: 120,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '100',
    },
  },

  {
    headerName: t('fields.density'),
    field: 'trsf_density',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    cellRenderer: 'DensityRenderer',
    cellRendererParams: {
      digits: '1',
    },
  },
  {
    headerName: t('fields.temperature'),
    field: 'trsf_temp',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 140,
    cellEditor: 'TemperatureEditor',
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    cellEditorParams: {
      min: -18,
      max: 150,
      txt: t,
    },
    cellRenderer: 'TemperatureRenderer',
    cellRendererParams: {
      digits: '1',
    },
  },
  {
    headerName: t('fields.observedQuantity'),
    field: 'trsf_qty_amb',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    cellEditor: 'ObservedEditor',
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    cellEditorParams: {
      min: 0,
      max: 999999999,
      txt: t,
    },
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '100',
    },
  },
  {
    headerName: t('fields.standardQuantity'),
    field: 'trsf_qty_cor',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    cellEditor: 'StandardEditor',
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    cellEditorParams: {
      min: 0,
      max: 999999999,
      txt: t,
    },
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '100',
    },
  },
  {
    headerName: t('fields.massQuantity'),
    field: 'trsf_load_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    cellEditor: 'MassEditor',
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 150,
    cellEditorParams: {
      min: 0,
      max: 999999999,
      txt: t,
    },
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '100',
    },
  },

  {
    headerName: 'Capacity',
    field: 'trsf_cmpt_capacit',
    hide: true,
  },
];

export default columns;
