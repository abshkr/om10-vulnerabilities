const columns = t => [
  {
    headerName: t('fields.code'),
    field: 'tank_code',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.location'),
    field: 'tank_location',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },
  {
    headerName: t('fields.baseProductName'),
    field: 'base_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },
  {
    headerName: `${t('fields.tankLevel')} (mm)`,
    field: 'tank_prod_lvl',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.temperature')} (°C)`,
    field: 'tank_temp',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.standardVolume'),
    field: 'netvol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.observedVolume'),
    field: 'grossvol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.pumpableVolume'),
    field: 'pumpablevol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.openingStock'),
    field: 'usablevol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.bookBalance'),
    field: 'bookbalance',
    sortable: true,
    resizable: true,
  },
];

export default columns;
