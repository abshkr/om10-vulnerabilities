const columns = (IS_NOMINATION, t) => [
  {
    headerName: t('fields.source'),
    field: 'mv_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION
  },
  {
    headerName: t('fields.tripNumber'),
    field: 'shls_trip_no',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    hide: !IS_NOMINATION,
    pinned: 'left'
  },
  {
    headerName: t('fields.loadId'),
    field: 'shlsload_load_id',
    sortable: true,
    resizable: true,
    width: 70,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.origin'),
    field: 'mv_key',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION
  },
  {
    headerName: t('fields.date'),
    field: 'shls_caldate',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    cellRenderer: 'DateRenderer'
  },
  {
    headerName: t('fields.status'),
    field: 'shls_status',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.carrierCode'),
    field: 'mv_status_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION
  },
  {
    headerName: t('fields.carrier'),
    field: 'carrier',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.vehicle'),
    field: 'tnkr_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.tanker'),
    field: 'mv_dtim_expiry',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION
  },
  {
    headerName: t('fields.tankerName'),
    field: 'mv_dtim_create',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION
  },
  {
    headerName: t('fields.supplierCode'),
    field: 'mv_dtim_change',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION
  },
  {
    headerName: t('fields.supplier'),
    field: 'drawer_name',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.nominationKey'),
    field: 'mv_key',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.priority'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION
  },
  {
    headerName: t('fields.orderNumber'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION
  },
  {
    headerName: t('fields.customerCode'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION
  },

  {
    headerName: t('fields.loadStart'),
    field: 'shls_ld_start',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    cellRenderer: 'DateRenderer'
  },
  {
    headerName: t('fields.loadEnd'),
    field: 'shls_ld_end',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    cellRenderer: 'DateRenderer'
  },

  {
    headerName: t('fields.product'),
    field: 'trsf_product',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.ambient'),
    field: 'trsf_qty_amb',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.standard'),
    field: 'trsf_qty_cor',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.mass'),
    field: 'trsf_load_kg',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.postedOn'),
    field: 'dt_posted',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
    cellRenderer: 'DateRenderer'
  },

  {
    headerName: t('fields.alternateQuantity'),
    field: 'trsa_alt_qty',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.alternateUnit'),
    field: 'trsa_alt_unt',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.tripType'),
    field: 'ld_type',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.unload'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.reversed'),
    field: 'load_reverse_flag',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.archived'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION
  },
  {
    headerName: t('fields.supplierOrigin'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION
  },
  {
    headerName: t('fields.lastModifiedBy'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.lastModified'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    cellRenderer: 'DateRenderer'
  },
  {
    headerName: t('fields.soldTo'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION
  },
  {
    headerName: t('fields.shipTo'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION
  }
];

export default columns;
