const columns = (t) => [
  {
    headerName: t('fields.id'),
    field: 'mv_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 80,
  },

  {
    headerName: t('fields.nominationKey'),
    field: 'mv_key',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.terminal'),
    field: 'mv_terminal',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.nominationNumber'),
    field: 'mv_number',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.nominationSource'),
    field: 'mv_srctype_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.nominationStatus'),
    field: 'mv_status_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.effectiveFrom'),
    field: 'mv_dtim_effect',
    cellRenderer: 'DateRenderer',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.expiredAfter'),
    field: 'mv_dtim_expiry',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.createdAt'),
    field: 'mv_dtim_create',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.lastModified'),
    field: 'mv_dtim_change',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.lastModifiedBy'),
    field: 'mv_oper_change',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true,
  },
];

export default columns;
