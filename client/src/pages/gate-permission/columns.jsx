const columns = t => [
  {
    headerName: t('fields.permissionId'),
    field: 'prmssn_k',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.permissionName'),
    field: 'prmssn_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.gate'),
    field: 'prmssn_gate',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.timeCode'),
    field: 'prmssn_gatetcd',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.areaId'),
    field: 'prmssn_areaid',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.areaName'),
    field: 'prmssn_areaname',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.deviceCode'),
    field: 'prmssn_adv_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.deviceType'),
    field: 'prmssn_adv_device',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.devicePort'),
    field: 'prmssn_adv_port',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.deviceLockout'),
    field: 'prmssn_adv_lockout',
    filter: 'BooleanFilter',
    cellRenderer: 'BooleanRenderer',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.devicePinPassword'),
    field: 'prmssn_adv_pin_pass',
    filter: 'BooleanFilter',
    cellRenderer: 'BooleanRenderer',
    sortable: true,
    resizable: true
  }
];

export default columns;
