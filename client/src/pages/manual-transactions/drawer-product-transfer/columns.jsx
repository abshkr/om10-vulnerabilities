const columns = (t, form, setPayload, payload, tripType, drawers) => [
  {
    headerName: t('fields.compartmentNumber'),
    field: 'trsf_cmpt_no',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    pinned: 'left',
  },

  {
    headerName: t('fields.soldTo'),
    field: 'trsf_sold_to',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: tripType === 'BY_PRODUCT',
    width: 80,
  },

  {
    headerName: t('fields.deliverNumber'),
    field: 'trsf_delv_num',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    hide: tripType === 'BY_PRODUCT',
  },

  {
    headerName: t('fields.shipTo'),
    field: 'trsf_delv_loc',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 80,
    hide: tripType === 'BY_PRODUCT',
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
    width: 250,
    cellEditorParams: {
      values: drawers?.records || [],
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
    width:120,
    hide: tripType === 'BY_PRODUCT',
  },
  {
    headerName: t('fields.oprdProdQty'),
    field: 'trsf_qty_left',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: false,
    width:120,
    hide: tripType === 'BY_PRODUCT',
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
    },
  },
];

export default columns;
