const columns = t => [
  {
    headerName: t('fields.id'),
    field: 'eqpt_id',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.code'),
    field: 'eqpt_code',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.title'),
    field: 'eqpt_title',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.activeTanker'),
    field: 'eqpt_tanker',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true
  },
  {
    headerName: t('fields.owner'),
    field: 'eqpt_owner_name',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true
  },

  {
    headerName: t('fields.equipmentType'),
    field: 'eqpt_etp_title',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true
  },
  {
    headerName: t('fields.locked'),
    field: 'eqpt_lock',
    sortable: true,
    filter: 'BooleanFilter',
    cellRenderer: 'LockRenderer',
    resizable: true
  },
  {
    headerName: t('fields.loadType'),
    field: 'eqpt_load_type_name',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true
  },
  {
    headerName: t('fields.mustTareIn'),
    field: 'eqp_must_tare_in',
    sortable: true,
    filter: 'BooleanFilter',
    cellRenderer: 'BooleanRenderer',
    resizable: true
  },
  {
    headerName: t('fields.lastModified'),
    field: 'eqpt_last_modified',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.lastUsed'),
    field: 'eqpt_last_used',
    cellRenderer: 'DateRenderer',
    sortable: true,
    resizable: true
  }
];

export default columns;
