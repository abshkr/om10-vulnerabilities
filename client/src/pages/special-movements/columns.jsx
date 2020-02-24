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
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.movementType'),
    field: 'role_note',
    filter: 'mlitm_type_name',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.reasonCode'),
    field: 'role_note',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.movementStatus'),
    field: 'mv_status_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.lastModified'),
    field: 'mlitm_dtim_posted',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.lastModifiedUser'),
    field: 'mlitm_oper_posted',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  }
];

export default columns;
