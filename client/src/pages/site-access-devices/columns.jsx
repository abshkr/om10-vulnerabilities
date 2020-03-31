const columns = t => [
  {
    headerName: t('fields.deviceCode'),
    field: 'adv_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.deviceType'),
    field: 'adv_device',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.devicePort'),
    field: 'adv_port',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.deviceAreaCode'),
    field: 'adv_area',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.deviceAreaName'),
    field: 'adv_area_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.lockout'),
    field: 'adv_lockout',
    sortable: true,
    filter: 'BooleanFilter',
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: t('fields.pinPassword'),
    field: 'adv_pin_pass',
    sortable: true,
    filter: 'BooleanFilter',
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: t('fields.deviceSecurity'),
    field: 'adv_security',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.authLevelName'),
    field: 'adv_security_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.accessType'),
    field: 'adv_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  }
];

export default columns;
