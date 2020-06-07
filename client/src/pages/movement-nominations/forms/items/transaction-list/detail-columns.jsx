const detailColumns = (t) => [
  {
    headerName: t('fields.code'),
    field: 'base_code',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.name'),
    field: 'base_name',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.tankCode'),
    field: 'trsb_tk_tankcode',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.ambient') + ' (L)',
    field: 'trsb_avl',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.standard') + ' (L)',
    field: 'trsb_cvl',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.mass') + ' (kg)',
    field: 'trsb_kg',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.density') + ' (kg/m3)',
    field: 'trsb_dns',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.temp') + ' (C)',
    field: 'trsb_tmp',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.api') + ' (@60F)',
    field: 'trsb_api',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.temp') + ' (F)',
    field: 'trsb_tmp_f',
    sortable: true,
    resizable: true,
  },
];

export default detailColumns;
