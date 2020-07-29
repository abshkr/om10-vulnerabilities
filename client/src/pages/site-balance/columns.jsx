const columns = t => [
  {
    headerName: t('fields.tankCode'),
    field: 'tankcode',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
    width: 120,
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
    headerName: "[1]" + t('fields.openingStock'),
    field: 'openingstock',
    sortable: true,
    resizable: true,
  },
  {
    headerName: "[2]" + t('fields.receiptsToSite'),
    field: 'receiptsvol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: "[3]=[1+2]" + t('fields.totalAcc'),
    field: 'accnttot',
    sortable: true,
    resizable: true,
  },
  {
    headerName: "[4]" + t('fields.toTransferToOffsite'),
    field: 'transfervol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: "[5]=[3-4]" + t('fields.bookBalance'),
    field: 'bookbalance',
    sortable: true,
    resizable: true,
  },
  {
    headerName: "[6]" + t('fields.closingStock'),
    field: 'closingstock',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.gainLoss'),
    field: 'gainloss',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 120,
  },
];

export default columns;
