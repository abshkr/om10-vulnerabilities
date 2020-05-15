const folio = (t) => [
  {
    headerName: t('fields.bayNumber'),
    field: 'audit_datetime',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
  },
  {
    headerName: t('fields.numberOfUnloads'),
    field: 'audit_record_key',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
    width: 80,
  },
  {
    headerName: t('fields.totalProducts'),
    field: 'audit_action_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    suppressSizeToFit: true,
    width: 160,
  },
  {
    headerName: t('fields.averageQuantityLoad'),
    field: 'audit_category_name',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
  },
];

const movement = (t) => [
  {
    headerName: t('fields.baysLoads'),
    field: 'bays_per_load',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 160,
  },
  {
    headerName: t('fields.numberOfUnloads'),
    field: 'loads',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.percentage'),
    field: 'percent',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    suppressSizeToFit: true,
    width: 120,
  },
];

const ids = (t) => [
  {
    headerName: t('fields.bayCode'),
    field: 'bay_code',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.maxId'),
    field: 'max_transaction_id',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
    width: 80,
  },
  {
    headerName: t('fields.totalTransactions'),
    field: 'cnt_transaction_id',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    suppressSizeToFit: true,
    width: 160,
  },
];

export { folio, movement, ids };
