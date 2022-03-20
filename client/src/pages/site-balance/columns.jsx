const columns = (t, config) => [
  {
    headerName: t('fields.terminal'),
    field: 'tanksite',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    hide: true,
    suppressSizeToFit: true,
    width: 120,
  },
  {
    headerName: t('fields.terminal'),
    field: 'tanksitename',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    hide: !config?.siteUseMultiTerminals,
    suppressSizeToFit: true,
    width: 180,
  },
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
    suppressSizeToFit: true,
    width: 180,
  },
  {
    headerName: t('fields.baseProductName'),
    field: 'productname',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    suppressSizeToFit: true,
    width: 200,
  },
  {
    headerName: '[1]' + t('fields.openingStock'),
    field: 'openingstock',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 155,
  },
  {
    headerName: '[2]' + t('fields.receiptsToSite'),
    field: 'receiptsvol',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 155,
  },
  {
    headerName: '[3]' + t('fields.transferIn'),
    field: 'transferin',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 155,
  },
  {
    headerName: '[4]=[1+2+3]' + t('fields.totalAcc'),
    field: 'accnttot',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 170,
  },
  {
    headerName: '[5]' + t('fields.disposalForOffsite'),
    field: 'transfervol',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 180,
  },
  {
    headerName: '[6]' + t('fields.transferOut'),
    field: 'transferout',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 155,
  },
  {
    headerName: '[7]=[4-5-6]' + t('fields.bookBalance'),
    field: 'bookbalance',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 200,
  },
  {
    headerName: '[8]' + t('fields.closingStock'),
    field: 'closingstock',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 155,
  },
  {
    headerName: t('fields.gainLoss'),
    field: 'gainloss',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 120,
  },
  {
    headerName: t('fields.openingDateTime'),
    field: 'base_period_open',
    cellRenderer: 'DateRenderer',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.siteFolioTankBaseChange,
    suppressSizeToFit: true,
    width: 180,
  },
  {
    headerName: t('fields.closingDateTime'),
    field: 'base_period_close',
    cellRenderer: 'DateRenderer',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.siteFolioTankBaseChange,
    suppressSizeToFit: true,
    width: 180,
  },
];

export default columns;
