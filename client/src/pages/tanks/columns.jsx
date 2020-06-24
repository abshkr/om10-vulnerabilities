const columns = (t, config) => [
  {
    headerName: t('fields.tankCode'),
    field: 'tank_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    pinned: 'left',
  },
  {
    width: 120,
    headerName: t('fields.atgStatus'),
    field: 'tank_atg_status',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'ATGRenderer',
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.inUse'),
    field: 'tank_active',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 110,
    cellRenderer: 'BooleanRenderer',
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.tankName'),
    field: 'tank_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.productCode'),
    field: 'tank_base',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 140,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.productName'),
    field: 'tank_base_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 160,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.productCategory'),
    field: 'tank_bclass_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.area'),
    field: 'tank_location',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 110,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.productLevel'),
    field: 'tank_prod_lvl',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 130,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.levelAlarmState'),
    field: 'tank_lvlalarm_desc',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.gaugingMethod'),
    field: 'tank_gaugingmthd_desc',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 160,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ambientVolume'),
    field: 'tank_amb_vol',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.standardVolume'),
    field: 'tank_cor_vol',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.liquidMass'),
    field: 'tank_liquid_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.ullage'),
    field: 'tank_ullage',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.density'),
    field: 'tank_density',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.standardDensity'),
    field: 'tank_15_density',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageAPI,
    width: 140,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.api'),
    field: 'tank_api',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageAPI,
    width: 110,
    suppressSizeToFit: true,
    hide: !config?.manageAPI,
  },

  {
    headerName: t('fields.observedTemperature'),
    field: 'tank_temp',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 160,
    suppressSizeToFit: true,
    cellRenderer: 'TemperatureRender',
  },

  {
    headerName: t('fields.tankGroup'),
    field: 'tank_group',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.atgManualUpdated'),
    field: 'tank_atg_manchg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 160,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.sulphur'),
    field: 'tank_sulphur',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.flashPoint'),
    field: 'tank_flashpoint',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.tankStatus'),
    field: 'tank_status',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageTankLevelAlarms,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.description'),
    field: 'tank_status_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageTankLevelAlarms,
    width: 160,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.hhLevel'),
    field: 'tank_hh_level',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageTankLevelAlarms,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.hLevel'),
    field: 'tank_h_level',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageTankLevelAlarms,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.lLevel'),
    field: 'tank_l_level',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageTankLevelAlarms,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.llLevel'),
    field: 'tank_ll_level',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageTankLevelAlarms,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.userHLevel'),
    field: 'tank_uh_level',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageTankLevelAlarms,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.userLLevel'),
    field: 'tank_ul_level',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageTankLevelAlarms,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.hhState'),
    field: 'tank_hh_state',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageTankLevelAlarms,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.hState'),
    field: 'tank_h_state',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageTankLevelAlarms,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.lState'),
    field: 'tank_l_state',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageTankLevelAlarms,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.llState'),
    field: 'tank_ll_state',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageTankLevelAlarms,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.userHState'),
    field: 'tank_uh_state',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageTankLevelAlarms,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.userLState'),
    field: 'tank_ul_state',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.manageTankLevelAlarms,
    width: 120,
    suppressSizeToFit: true,
  },
];

export default columns;
