const columns = t => [
  {
    headerName: `${t('fields.select')}`,
    field: 'mvitm_line_id',
    width: 40,
    checkboxSelection: true,
    cellRenderer: 'NullRenderer',
    suppressSizeToFit: true,
    pinned: 'left'
  },
  {
    headerName: t('fields.line'),
    field: 'mvitm_line_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 70,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.itemId'),
    field: 'mvitm_item_id',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 90,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.locked'),
    field: 'mvitm_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 90,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.nominationType'),
    field: 'mvitm_type_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 140,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.itemKey'),
    field: 'mvitm_item_key',
    sortable: true,
    resizable: true,
    width: 80,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.itemStatus'),
    field: 'mvitm_status_name',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.productQuantity'),
    field: 'mvitm_prod_qty',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.productUnit'),
    field: 'mvitm_prod_unit_str',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.fromPlant'),
    field: 'mvitm_plant_from',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.fromSupplier'),
    field: 'mvitm_prodcmpy_from',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.fromProduct'),
    field: 'mvitm_prodname_from',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.fromTank'),
    field: 'mvitm_tank_from',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.fromStoreLocationCompany'),
    field: 'mvitm_shiploc_from',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.fromDescription'),
    field: 'mvitm_shiptext_from',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.fromSecondDescription'),
    field: 'mvitm_shiptext_from2',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.toPlant'),
    field: 'mvitm_plant_to',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.toSupplier'),
    field: 'mvitm_prodcmpy_to',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.toProduct'),
    field: 'mvitm_prodname_to',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.toTank'),
    field: 'mvitm_tank_to',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.toStoreLocationCompany'),
    field: 'mvitm_shiploc_to',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.toDescription'),
    field: 'mvitm_shiptext_to',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.toSecondDescription'),
    field: 'mvitm_shiptext_to2',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.comments'),
    field: 'mvitm_comments',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.quantityScheduled'),
    field: 'mvitm_qty_schd',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.quantityMoved'),
    field: 'mvitm_qty_move',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.quantityDelivered'),
    field: 'mvitm_qty_delv',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true
  }
];

export default columns;
