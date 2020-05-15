const columns = (t) => [
  {
    headerName: t('fields.id'),
    field: 'etyp_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 60,
  },
  {
    headerName: t('fields.equipmentCode'),
    field: 'etyp_title',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.compartments'),
    field: 'etyp_n_items',
    filterable: true,
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.preview'),
    field: 'image',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.schedulable'),
    field: 'etyp_schedul',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.rigid'),
    field: 'etyp_isrigid',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
  },
];

export default columns;
