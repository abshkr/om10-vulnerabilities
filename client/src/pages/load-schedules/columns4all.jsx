import { TANKER_LIST } from 'constants/routes';

const columns = (IS_NOMINATION, t, config) => [
  {
    headerName: t('fields.terminal'),
    field: 'shls_terminal',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    pinned: 'left',
  },
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
    headerName: t('fields.origin'),
    field: 'shls_trip_no_org',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 140,
    suppressSizeToFit: true,
    hide: IS_NOMINATION,
  },
  {
    headerName: t('fields.sourceTrip'),
    field: 'shls_srctype_desc',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 130,
    suppressSizeToFit: true,
    hide: IS_NOMINATION,
    cellRenderer: 'SourceRender',
  },
  {
    headerName: t('fields.schdConvertTrace'),
    field: 'shls_cnvrt_trace',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 130,
    suppressSizeToFit: true,
    hide: IS_NOMINATION || !config?.siteSchdTypeConvertible,
    cellRenderer: 'ConvertTraceRender',
    cellRendererParams: {
      t: t,
    },
  },
  {
    headerName: t('fields.schedDate'),
    field: 'shls_caldate',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    cellRenderer: 'DateRenderer',
  },
  {
    headerName: t('fields.tripStatus'),
    field: 'shls_status',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 140,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.carrierCode'),
    field: 'carrier_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 140,
    suppressSizeToFit: true,
    hide: IS_NOMINATION,
  },
  {
    headerName: t('fields.carrierName'),
    field: 'carrier',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },
  /* {
    headerName: t('fields.vehicle'),
    field: 'tnkr_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 130,
    suppressSizeToFit: true,
  }, */

  {
    headerName: t('fields.tankerCode'),
    field: 'tnkr_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 130,
    suppressSizeToFit: true,
    cellRenderer: 'LinkRenderer',
    cellRendererParams: {
      endpoint: TANKER_LIST,
      field: 'tanker',
      index: 'tnkr_code',
    },
  },
  {
    headerName: t('fields.tankerName'),
    field: 'tnkr_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 130,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.supplierCode'),
    field: 'supplier_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.supplier'),
    field: 'supplier',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 140,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.drawerCode'),
    field: 'drawer_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.drawer'),
    field: 'drawer_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    width: 140,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.nominationKey'),
    field: 'mv_key',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
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
    headerName: t('fields.hostData'),
    field: 'shl_fleet_data',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 130,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.orderNumber'),
    field: 'order_cust_ordno',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.customerAcctOfOrder'),
    field: 'order_cust',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 220,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.customerCodeOfOrder'),
    field: 'order_cust_cmpy_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 200,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.customerNameOfOrder'),
    field: 'order_cust_cmpy_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 210,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.customerAcctOfTrip'),
    field: 'shls_cust',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION || (!config?.site_customer_product && !config?.site_customer_carrier),
    width: 210,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.customerCodeOfTrip'),
    field: 'shls_cust_cmpycode',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION || (!config?.site_customer_product && !config?.site_customer_carrier),
    width: 200,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.customerNameOfTrip'),
    field: 'shls_cust_cmpyname',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION || (!config?.site_customer_product && !config?.site_customer_carrier),
    width: 200,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.loadStart'),
    field: 'shls_ld_start',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    cellRenderer: 'DateRenderer',
  },
  {
    headerName: t('fields.loadEnd'),
    field: 'shls_ld_end',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    cellRenderer: 'DateRenderer',
  },
  {
    headerName: t('fields.product'),
    field: 'trsf_product',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t(config?.siteLabelUser + 'fields.ambient'),
    field: 'trsf_qty_amb',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t(config?.siteLabelUser + 'fields.standard'),
    field: 'trsf_qty_cor',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION,
    width: 120,
    suppressSizeToFit: true,
  },

  {
    headerName: t(config?.siteLabelUser + 'fields.mass'),
    field: 'trsf_load_kg',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION || !config?.siteMassInVacuum,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.massInAir'),
    field: 'trsf_air_kg',
    sortable: true,
    resizable: true,
    hide: !IS_NOMINATION || !config?.siteMassInAir,
    width: 120,
    suppressSizeToFit: true,
    cellRenderer: 'MassInAirRenderer',
    cellRendererParams: {
      digits: String(config?.precisionMass),
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
    width: 150,
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
    headerName: t('fields.loadExpiry'),
    field: 'shls_exp2',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    cellRenderer: 'DateRenderer',
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
    hide: IS_NOMINATION,
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
    headerName: t('fields.loadId'),
    field: 'shlsload_load_id',
    sortable: true,
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.lastModifiedBy'),
    field: 'operator',
    sortable: true,
    resizable: true,
    width: 140,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.lastModified'),
    field: 'last_chg_time',
    sortable: true,
    resizable: true,
    hide: IS_NOMINATION,
    width: 150,
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