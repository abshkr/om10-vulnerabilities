const columns = t => [
  {
    headerName: t('fields.bay'),
    field: 'trsa_bay_cd',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.transactionNumber'),
    field: 'trsa_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.tripNumber'),
    field: 'trsa_trip',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.loadId'),
    field: 'load_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.tanker'),
    field: 'trsa_tanker',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.operator'),
    field: 'trsa_per_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.startDate'),
    field: 'trsa_st_dmy',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.endDate'),
    field: 'trsa_ed_dmy',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.terminal'),
    field: 'trsa_terminal',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.lastModifiedBy'),
    field: 'trsa_psn',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.lastModified'),
    field: 'trsa_crt_dmy',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true
  }
];

export default columns;
