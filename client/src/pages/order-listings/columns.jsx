const columns = (t) => [
  {
    headerName: t('fields.orderNumber'),
    field: 'pgr_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.supplier'),
    field: 'pgr_description',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.customer'),
    field: 'pgr_unit',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.customerOrderNumber'),
    field: 'pgr_unitname',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.orderStatus'),
    field: 'products_amount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.orderTime'),
    field: 'products_amount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.expiryDate'),
    field: 'products_amount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.lastModified'),
    field: 'products_amount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 140,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.deliveryLocation'),
    field: 'products_amount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 140,
  },

  {
    headerName: t('fields.referenceCode'),
    field: 'products_amount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 140,
  },

  {
    headerName: t('fields.deliveryTime'),
    field: 'products_amount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 140,
  },

  {
    headerName: t('fields.drawer'),
    field: 'products_amount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
  },

  {
    headerName: t('fields.carrier'),
    field: 'products_amount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
  },

  {
    headerName: t('fields.approved'),
    field: 'products_amount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 120,
  },

  {
    headerName: t('fields.operator'),
    field: 'products_amount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
  },

  {
    headerName: t('fields.soldTo'),
    field: 'products_amount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
  },

  {
    headerName: t('fields.shipTo'),
    field: 'products_amount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
  },
];

export default columns;
