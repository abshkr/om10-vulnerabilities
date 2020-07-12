const columns = (configuration, t) => [
  {
    headerName: t('fields.code'),
    field: 'tank_code',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    pinned: 'left',
    width: 100
  },
  {
    headerName: t('fields.name'),
    field: 'tank_name',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter'
  },
  {
    headerName: t('fields.terminal'),
    field: 'tank_terminal',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    hide: true,
  },
  {
    headerName: t('fields.terminal'),
    field: 'tank_sitename',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter'
  },
  {
    headerName: t('fields.baseProductCode'),
    field: 'tank_base',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter'
  },
  {
    headerName: t('fields.baseProductName'),
    field: 'tank_base_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter'
  },
  {
    headerName: t('fields.productCategory'),
    field: 'tank_bclass_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter'
  },
  {
    headerName: `${t('fields.density')} (${t('units.kg/m3')})`,
    field: 'tank_density',
    sortable: true,
    resizable: true
  },
  {
    headerName: `${t('fields.dailyVarianceLimit')} (${t('units.volume')})`,
    field: 'tank_dtol_volume',
    sortable: true,
    resizable: true
  },
  {
    headerName: `${t('fields.dailyVarianceLimit')} (%)`,
    field: 'tank_dtol_percent',
    sortable: true,
    resizable: true
  },
  {
    headerName: `${t('fields.monthlyVarianceLimit')} (${t('units.volume')})`,
    field: 'tank_mtol_volume',
    sortable: true,
    resizable: true
  },
  {
    headerName: `${t('fields.monthlyVarianceLimit')} (%)`,
    field: 'tank_mtol_percent',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.adaptiveArmPriority'),
    field: 'tank_afc_priority',
    sortable: true,
    resizable: true,
    hide: !configuration?.features?.adaptiveFlowControl
  },

  {
    headerName: t('fields.flowRate'),
    field: 'tank_max_flow',
    sortable: true,
    resizable: true,
    hide: !configuration?.features?.adaptiveFlowControl
  }
];

export default columns;
