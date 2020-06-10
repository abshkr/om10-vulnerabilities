const columns = (t, form, setPayload, payload, type, drawers) => [
  {
    headerName: t('fields.compartmentNumber'),
    field: 'tnkr_cmpt_no',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    pinned: 'left',
  },

  {
    headerName: t('fields.soldTo'),
    field: 'customer_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: type === 'BY_PRODUCT',
    width: 80,
  },

  {
    headerName: t('fields.deliverNumber'),
    field: 'delivery_number',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    hide: type === 'BY_PRODUCT',
  },

  {
    headerName: t('fields.shipTo'),
    field: 'delivery_location',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 80,
    hide: type === 'BY_PRODUCT',
  },

  {
    headerName: t('fields.equipmentId'),
    field: 'eqpt_code',
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
    field: 'drawer_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
  },

  {
    headerName: t('fields.drawerProduct'),
    field: 'prod_code',
    hide: true,
  },

  {
    headerName: t('fields.drawerProduct'),
    field: 'prod_code',
    hide: true,
  },

  {
    headerName: t('fields.company'),
    field: 'prod_cmpy',
    hide: true,
  },

  {
    headerName: t('fields.drawerProduct'),
    field: 'prod_name',
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
    field: 'arm_code',
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
    headerName: t('fields.density'),
    field: 'dens',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
  },
  {
    headerName: t('fields.temperature'),
    field: 'temperature',
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
    field: 'amb_vol',
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
    field: 'cor_vol',
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
    field: 'liq_kg',
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
