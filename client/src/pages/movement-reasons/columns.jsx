const columns = t => [
  {
    headerName: t('fields.description'),
    field: 'mlitm_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.type'),
    field: 'mlitm_mov_key',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.originalMovementType'),
    field: 'mlitm_dtim_start',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.originalReasonCode'),
    field: 'role_note',
    filter: 'mlitm_type_name',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.reversalMovementType'),
    field: 'role_note',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.reversalReasonCode'),
    field: 'mv_status_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.status'),
    field: 'mlitm_dtim_posted',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  }
];

export default columns;
