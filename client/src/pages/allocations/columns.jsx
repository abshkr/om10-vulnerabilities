const columns = t => [
  {
    headerName: t('fields.typeId'),
    field: 'alloc_type',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.type'),
    field: 'alloc_typename',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.companyCode'),
    field: 'alloc_cmpycode',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.company'),
    field: 'alloc_cmpyname',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.supplierCode'),
    field: 'alloc_suppcode',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.supplier'),
    field: 'alloc_suppname',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.lockId'),
    field: 'alloc_lock',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.lockType'),
    field: 'alloc_lockname',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.periodId'),
    field: 'alloc_period',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.period'),
    field: 'alloc_periodname',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.createdAt'),
    field: 'alloc_datetime',
    sortable: true,
    resizable: true,
    cellRenderer: 'DateRenderer',
  },
];

export default columns;
