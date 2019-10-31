const columns = t => [
  {
    headerName: t('fields.tankCode'),
    field: 'tankcode',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.baseProductCode'),
    field: 'productcode',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.baseProductName'),
    field: 'productname',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },
  {
    headerName: t('fields.openingStock'),
    field: 'openingstock',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.receiptsToSite'),
    field: 'receiptsvol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.totalAcc'),
    field: 'accnttot',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.toTransferToOffsite'),
    field: 'transfervol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.bookBalance'),
    field: 'bookbalance',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.closingStock'),
    field: 'closingstock',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.gainLoss'),
    field: 'gainloss',
    sortable: true,
    resizable: true,
  },
];

export default columns;
