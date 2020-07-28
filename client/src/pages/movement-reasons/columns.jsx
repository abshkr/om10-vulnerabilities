const columns = t => [
  {
    headerName: t('fields.description'),
    field: 'mr_action',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.type'),
    field: 'mr_type_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.originalMovementType'),
    field: 'mr_mov_type_ori',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.originalReasonCode'),
    field: 'mr_reason_code_ori',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.reversalMovementType'),
    field: 'mr_mov_type_rev',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.reversalReasonCode'),
    field: 'mr_reason_code_rev',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.showComment'),
    field: 'mr_show_comment',
    filter: 'FuzzyFilter',
    cellRenderer: 'BooleanRenderer',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.status'),
    field: 'mr_flag_desc',
    filter: 'FuzzyFilter',
    // cellRenderer: 'BooleanRenderer',
    sortable: true,
    resizable: true
  }
];

export default columns;
