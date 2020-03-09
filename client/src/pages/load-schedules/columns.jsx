const columns = (isFromNomination, t) => [
  {
    headerName: t('fields.source'),
    field: 'mv_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: isFromNomination
  },
  {
    headerName: t('fields.tripNumber'),
    field: 'mv_terminal',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    hide: !isFromNomination
  },
  {
    headerName: t('fields.loadId'),
    field: 'mv_oper_change',
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
    hide: isFromNomination
  },
  {
    headerName: t('fields.date'),
    field: 'mv_number',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.status'),
    field: 'mv_srctype_name',
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
    hide: isFromNomination
  },
  {
    headerName: t('fields.carrier'),
    field: 'mv_dtim_effect',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.vehicle'),
    field: 'mv_dtim_effect',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !isFromNomination,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.tanker'),
    field: 'mv_dtim_expiry',
    sortable: true,
    resizable: true,
    hide: isFromNomination
  },
  {
    headerName: t('fields.tankerName'),
    field: 'mv_dtim_create',
    sortable: true,
    resizable: true,
    hide: isFromNomination
  },
  {
    headerName: t('fields.supplierCode'),
    field: 'mv_dtim_change',
    sortable: true,
    resizable: true,
    hide: isFromNomination
  },
  {
    headerName: t('fields.supplier'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.nominationKey'),
    field: 'mv_dtim_effect',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !isFromNomination,
    width: 120,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.priority'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: isFromNomination
  },
  {
    headerName: t('fields.orderNumber'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: isFromNomination
  },
  {
    headerName: t('fields.customerCode'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: isFromNomination
  },

  {
    headerName: t('fields.loadStart'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true
  },
  {
    headerName: t('fields.loadEnd'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.product'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: !isFromNomination,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.ambient'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: !isFromNomination,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.standard'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: !isFromNomination,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.mass'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: !isFromNomination,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.postedOn'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: !isFromNomination,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.alternateQuantity'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: !isFromNomination,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.alternateUnit'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: !isFromNomination,
    width: 120,
    suppressSizeToFit: true
  },

  {
    headerName: t('fields.tripType'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: !isFromNomination,
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
    field: 'mv_oper_change',
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
    hide: isFromNomination
  },
  {
    headerName: t('fields.supplierOrigin'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: isFromNomination
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
    hide: isFromNomination
  },
  {
    headerName: t('fields.soldTo'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: isFromNomination
  },
  {
    headerName: t('fields.shipTo'),
    field: 'mv_oper_change',
    sortable: true,
    resizable: true,
    hide: isFromNomination
  }
];

export default columns;
