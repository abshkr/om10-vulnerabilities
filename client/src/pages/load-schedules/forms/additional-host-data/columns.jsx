const columns = (t) => [
  {
    headerName: t('fields.compartment'),
    field: 'dh_shlscmpt',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 140,
  },
  {
    headerName: t('fields.delvNo'),
    field: 'dh_dor_number',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
  },
  {
    headerName: t('fields.additionalHostDataType'),
    field: 'dh_dor_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.additionalHostData'),
    field: 'dh_dor_origin',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.dateChanged'),
    field: 'dh_chg_date',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.userCode'),
    field: 'dh_per_code',
    sortable: true,
    resizable: true,
    width: 120,
  },
  {
    headerName: t('fields.userName'),
    field: 'dh_per_name',
    sortable: true,
    resizable: true,
    width: 120,
  },
];

export default columns;
