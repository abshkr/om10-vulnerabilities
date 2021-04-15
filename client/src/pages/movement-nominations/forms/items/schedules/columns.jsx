const columns = (IS_NOMINATION, t, config) => [
  {
    headerName: t('fields.tripNumber'),
    field: 'shls_trip_no',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    pinned: 'left',
  },

  {
    headerName: t('fields.sourceTrip'),
    field: 'shls_srctype',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
    hide: IS_NOMINATION,
  },

  {
    headerName: t('fields.loadId'),
    field: 'shlsload_load_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.origin'),
    field: 'shls_trip_no_org',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 80,
    suppressSizeToFit: true,
    hide: IS_NOMINATION,
  },
  {
    headerName: t('fields.date'),
    field: 'shls_caldate',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    cellRenderer: 'DateRenderer',
  },
  {
    headerName: t('fields.status'),
    field: 'shls_status',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.carrierCode'),
    field: 'carrier_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    hide: IS_NOMINATION,
  },
  {
    headerName: t('fields.carrier'),
    field: 'carrier',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.vehicle'),
    field: 'tnkr_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.tanker'),
    field: 'tnkr_code',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.tankerName'),
    field: 'tnkr_name',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.supplierCode'),
    field: 'supplier_code',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.supplier'),
    field: 'supplier',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.nominationKey'),
    field: 'mv_key',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 160,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.priority'),
    field: 'shls_priority',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.orderNumber'),
    field: 'order_cust_ordno',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.customerCode'),
    field: 'order_cust_cmpy_code',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.loadStart'),
    field: 'shls_ld_start',
    sortable: true,
    resizable: true,
    width: 160,
    suppressSizeToFit: true,
    cellRenderer: 'DateRenderer',
  },
  {
    headerName: t('fields.loadEnd'),
    field: 'shls_ld_end',
    sortable: true,
    resizable: true,
    width: 160,
    suppressSizeToFit: true,
    cellRenderer: 'DateRenderer',
  },

  {
    headerName: t('fields.product'),
    field: 'trsf_product',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 200,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.ambient'),
    field: 'trsf_qty_amb',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.standard'),
    field: 'trsf_qty_cor',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.mass'),
    field: 'trsf_load_kg',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION || !config?.siteMassInVacuum,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.massInAir'),
    field: 'trsf_air_kg',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION || !config?.siteMassInAir,
    width: 120,
    suppressSizeToFit: true,
    cellRenderer: 'MassInAirRenderer',
    cellRendererParams: {
      digits: '3',
      massInVacuum: 'trsf_load_kg',
      standardVolume: 'trsf_qty_cor',
      factor: config?.airBuoyancyFactor,
    },
  },

  {
    headerName: t('fields.postedOn'),
    field: 'dt_posted',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 160,
    suppressSizeToFit: true,
    cellRenderer: 'DateRenderer',
  },

  {
    headerName: t('fields.alternateQuantity'),
    field: 'trsa_alt_qty',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.alternateUnit'),
    field: 'trsa_alt_unt',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.tripType'),
    field: 'ld_type',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.unload'),
    field: 'unload',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.reversed'),
    field: 'reversed',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.archived'),
    field: 'archived',
    sortable: true,
    resizable: true,
    hide: true,
    width: 120,
    suppressSizeToFit: true,
    cellRenderer: 'BooleanRenderer',
  },

  {
    headerName: t('fields.supplierOrigin'),
    field: 'shls_supp_org',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.lastModifiedBy'),
    field: 'operator',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.lastModified'),
    field: 'last_chg_time',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
    cellRenderer: 'DateRenderer',
  },
  {
    headerName: t('fields.soldTo'),
    field: 'shls_sold_to_num',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.shipTo'),
    field: 'shls_ship_to_num',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },
];

export default columns;
