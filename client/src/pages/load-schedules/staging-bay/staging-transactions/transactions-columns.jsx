const columns = (t) => [
  {
    headerName: t('fields.bay'),
    field: 'trsa_bay_cd',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 90,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.transactionNumber'),
    field: 'trsa_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.tripNumber'),
    field: 'trsa_trip',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.supplier'),
    field: 'trsa_suppname',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.loadId'),
    field: 'load_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 110,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.tanker'),
    field: 'trsa_tanker',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.operator'),
    field: 'trsa_per_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.startDate'),
    field: 'trsa_st_dmy',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.endDate'),
    field: 'trsa_ed_dmy',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.reversed'),
    field: 'trsa_reverse_desc',
    sortable: true,
    resizable: true,
    width: 100,
    // suppressSizeToFit: true,
    filter: 'MultiFilter',
    // cellRenderer: 'TrueRenderer',
  },
  {
    headerName: t('fields.reversedTrans'),
    field: 'trsa_reverse_ex',
    sortable: true,
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.terminal'),
    field: 'trsa_terminal',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 110,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.lastModifiedBy'),
    field: 'trsa_psn',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
  },
  {
    headerName: t('fields.lastModified'),
    field: 'trsa_crt_dmy',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true,
  },
];

export default columns;