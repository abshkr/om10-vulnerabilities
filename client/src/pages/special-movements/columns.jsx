const columns = t => [
  {
    headerName: t('fields.movementNumber'),
    field: 'mlitm_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.nominationKey'),
    field: 'mlitm_mov_key',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.movementDateAndTime'),
    field: 'mlitm_dtim_start',
    cellRenderer: 'DateRenderer',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.movementType'),
    field: 'mlitm_type_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.reasonCode'),
    field: 'mlitm_reason',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.movementStatus'),
    field: 'mv_status_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.lastModified'),
    field: 'mlitm_dtim_posted',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.lastModifiedBy'),
    field: 'mlitm_oper_posted',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  }
];

export default columns;
