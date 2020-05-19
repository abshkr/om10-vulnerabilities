const columns = (t) => [
  {
    headerName: t('fields.tankCode'),
    field: 'tank_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.tankBaseProduct'),
    field: 'tank_basecode',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.tankBaseName'),
    field: 'tank_basename',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.isActivated'),
    field: 'tank_active',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.tankGroup'),
    field: 'tank_group',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  // {
  //   headerName: t('fields.terminalCode'),
  //   field: 'tgr_basename',
  //   filter: 'MultiFilter',
  //   sortable: true,
  //   resizable: true,
  // },
  // {
  //   headerName: t('fields.terminalName'),
  //   field: 'tgr_sitename',
  //   filter: 'MultiFilter',
  //   sortable: true,
  //   resizable: true,
  // },
];

export default columns;
