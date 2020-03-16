const columns = t => [
  {
    headerName: t('fields.line'),
    field: 'msitm_lineid',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.nominationItem'),
    field: 'mv_id',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.equipment'),
    field: 'mv_id',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.equipmentCompartment'),
    field: 'mv_id',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.compartment'),
    field: 'mv_id',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.product'),
    field: 'mv_id',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.scheduled'),
    field: 'mv_id',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.preset'),
    field: 'mv_id',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.loaded'),
    field: 'mv_id',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.preload'),
    field: 'mv_id',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.productUnit'),
    field: 'mv_id',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.bayArm'),
    field: 'mv_id',
    sortable: true,
    resizable: true
  }
];

export default columns;
