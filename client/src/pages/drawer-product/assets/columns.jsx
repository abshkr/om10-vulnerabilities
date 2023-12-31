const columns = t => [
  {
    headerName: t('fields.drawerCode'),
    field: 'prod_cmpycode',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    // suppressSizeToFit: true, 
    // pinned: "left",
  },
  {
    headerName: t('fields.oitemDrwrName'),
    field: 'prod_cmpyname',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // suppressSizeToFit: true,
    width: 180,
    // pinned: "left",
  },
  {
    headerName: t('fields.productCode'),
    field: 'prod_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // suppressSizeToFit: true,
    width: 140,
    // pinned: "left",
  },
  {
    headerName: t('fields.productName'),
    field: 'prod_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // suppressSizeToFit: true,
    // width: 220,
    // pinned: "left",
  },
  {
    headerName: t('fields.genericName'),
    field: 'prod_classdesc',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // suppressSizeToFit: true,
    width: 180,
  },
  {
    headerName: t('fields.backColor'),
    field: 'prod_backcolor',
    // filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'TagRenderer',
    // suppressSizeToFit: true,
    width: 120,
  },
  {
    headerName: t('fields.textColor'),
    field: 'prod_textcolor',
    // filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'TagRenderer',
    // suppressSizeToFit: true,
    width: 120,
  },
  {
    headerName: t('fields.prodImage'),
    field: 'prod_image',
    // filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'ImageRenderer',
    // suppressSizeToFit: true,
    // width: 130,
  }
];

export default columns;
