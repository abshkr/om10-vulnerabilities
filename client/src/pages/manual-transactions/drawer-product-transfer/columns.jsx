const columns = (t, type) => [
  {
    headerName: t('fields.soldTo'),
    field: 'mtd_type_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: type === 'open_order',
    width: 120,
    hide: true,
  },

  {
    headerName: t('fields.deliverNumber'),
    field: 'mtd_type_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    hide: true,
  },

  {
    headerName: t('fields.shipTo'),
    field: 'mtd_type_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: type === 'open_order',
    width: 130,
    hide: true,
  },

  {
    headerName: t('fields.equipmentId'),
    field: 'eqpt_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    cellEditor: 'EquipmentEditor',
    editable: true,

    cellEditorParams: {
      values: [],
    },
  },
  {
    headerName: t('fields.compartmentNumber'),
    field: 'tnkr_cmpt_no',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
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
    field: 'product_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    cellEditor: 'DrawerProductsEditor',
    editable: true,
    cellEditorParams: {
      values: [
        {
          drawer_name: 'test',
          drawer_code: '2323',
        },
      ],
    },
  },
  {
    headerName: t('fields.bayArm'),
    field: 'arm_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    cellEditor: 'BayArmEditor',
    editable: true,
    cellEditorParams: {
      values: [
        {
          arm_name: 'test',
          arm_code: '2323',
        },
      ],
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
    field: 'cor_vol',
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
    field: 'amb_vol',
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
