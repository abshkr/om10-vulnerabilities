const columns = t => [
  {
    headerName: t('fields.type'),
    field: 'hzcf_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.typeCode'),
    field: 'hzcf_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.typeDescription'),
    field: 'hzcf_un_num',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.enabled'),
    field: 'hzcf_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.rejectAuthorization'),
    field: 'hzcf_sub_risk',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.default'),
    field: 'hzcf_class',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.defaultValue'),
    field: 'hzcf_hz_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.dateTimeFormat'),
    field: 'hzcf_emrg',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.timeEnabled'),
    field: 'hzcf_emrg',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.totalChildRecords'),
    field: 'hzcf_emrg',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  }
];

export default columns;
