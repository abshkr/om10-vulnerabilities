const columns = (config, t) => [
  {
    headerName: t('fields.baseProductCode'),
    field: 'base_name',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.baseProductName'),
    field: 'base_name',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.bookBalance'),
    field: 'bookbalance',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.grossVolume'),
    field: 'grossvol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.netVolume'),
    field: 'netvol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.usableVolume'),
    field: 'usablevol',
    sortable: true,
    resizable: true,
  },
];

export default columns;
