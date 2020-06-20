const columns = (t) => [
  {
    headerName: t('fields.ddNumber'),
    field: 'dd_number',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    pinned: "left",
  },
  {
    headerName: t('fields.ddSuppCode'),
    field: 'dd_supp_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddSuppName'),
    field: 'dd_supp_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddTripOrdNo'),
    field: 'dd_tripord_no',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: false,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddLdType'),
    field: 'dd_ld_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddLoadTypeName'),
    field: 'dd_load_typename',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.ddSoldTo'),
    field: 'dd_sold_to',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: false,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddSoldToDesc'),
    field: 'dd_sold_to_desc',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddShipTo'),
    field: 'dd_ship_to',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: false,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddShipToDesc'),
    field: 'dd_ship_to_desc',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddDelvType'),
    field: 'dd_delv_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: false,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddDelvTypeName'),
    field: 'dd_delv_typename',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.ddRoute'),
    field: 'dd_route',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddShipCond'),
    field: 'dd_ship_cond',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddVehArrTime'),
    field: 'dd_veh_arr_time',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 130,
    cellRenderer: 'DateRenderer',
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddPhone'),
    field: 'dd_phone',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddInstruction'),
    field: 'dd_instruction',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddLpgRemark'),
    field: 'dd_lpg_remark',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddSalesOrdNum'),
    field: 'dd_sales_ord_num',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddCustPo'),
    field: 'dd_cust_po',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddSaleOrdType'),
    field: 'dd_sale_ord_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddVatId'),
    field: 'dd_vat_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 130,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddCustomCode'),
    field: 'dd_custom_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddLpgDestType'),
    field: 'dd_lpg_dest_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddPermitNum'),
    field: 'dd_permit_num',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ddSellCmpyCode'),
    field: 'dd_sell_cmpy_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
];
  

export default columns;
