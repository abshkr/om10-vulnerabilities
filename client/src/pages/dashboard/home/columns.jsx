const folio = (t) => [
  {
    headerName: t('fields.bayNumber'),
    field: 'trsa_bay_cd',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
  },
  {
    headerName: t('fields.numberOfUnloads'),
    field: 'loads',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
    width: 80,
  },
  {
    headerName: t('fields.totalProducts'),
    field: 'sum_amb',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    suppressSizeToFit: true,
    width: 160,
  },
  {
    headerName: t('fields.averageQuantityLoad'),
    field: 'avgamb_per_load',
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
    cellRenderer: 'AffixRenderer',
    suppressSizeToFit: true,
    width: 120,
    type: 'postfix',
    symbol: '%',
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
    headerName: t('fields.maxTransactionNumber'),
    field: 'max_transaction_id',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
    width: 200,
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
