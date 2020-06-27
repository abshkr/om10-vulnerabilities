const columns = (t, form, sourceType, loadType, loadNumber, setPayload, payload, products) => [
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
    hide: (
      !sourceType || 
      !loadNumber || 
      (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT') || 
      (sourceType === 'OPENORDER')
    ),
    width: 100,
  },

  {
    headerName: t('fields.deliverNumber'),
    field: 'trsf_delv_num',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: (sourceType === 'SCHEDULE' ? false : true),
    hide: (
      !sourceType || 
      !loadNumber || 
      (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT') 
    ),
    width: 100,
  },

  {
    headerName: t('fields.shipTo'),
    field: 'trsf_delv_loc',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: (
      !sourceType || 
      !loadNumber || 
      (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT') || 
      (sourceType === 'OPENORDER')
    ),
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

    cellEditorParams: {
      values: [],
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
    width: ((sourceType === 'SCHEDULE' && loadType === 'BY_COMPARTMENT') ? 200 : 360),
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
    editable: true,
    width: ((
      !sourceType || 
      !loadNumber ||
      (sourceType === 'SCHEDULE' && loadType === 'BY_COMPARTMENT')) ? 200 : 400
    ),
    cellEditorParams: {
      values: products?.records || [],
      form,
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
    cellEditorParams: {
      values: [],
      form,
      payload,
    },
  },

  {
    headerName: t('fields.scheduled'),
    field: 'trsf_qty_plan',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
    hide: (
      !sourceType || 
      !loadNumber || 
      (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT') || 
      (sourceType === 'OPENORDER')
    ),
    width:120,
  },
  {
    headerName: t('fields.oprdProdQty'),
    field: 'trsf_qty_left',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
    hide: (
      !sourceType || 
      !loadNumber || 
      (sourceType === 'SCHEDULE' && loadType === 'BY_PRODUCT') || 
      (sourceType === 'OPENORDER')
    ),
    width:120,
  },

  {
    headerName: t('fields.density'),
    field: 'trsf_density',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
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
    cellEditorParams: {
      min: -18,
      max: 150,
      txt: t,
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
    cellEditorParams: {
      min: 0,
      max: 999999999,
      txt: t,
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
    cellEditorParams: {
      min: 0,
      max: 999999999,
      txt: t,
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
    width: 150,
    cellEditorParams: {
      min: 0,
      max: 999999999,
      txt: t,
    },
  },

  {
    headerName: 'Capacity',
    field: 'trsf_cmpt_capacit',
    hide: true,
  },
];

export default columns;
