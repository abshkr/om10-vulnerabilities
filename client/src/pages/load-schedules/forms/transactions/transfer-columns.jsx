const transferColumns = (t) => [
  {
    headerName: t('fields.bayArm'),
    field: 'baa_bay_seq',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.trailerCode'),
    field: 'eqpt_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.product'),
    field: 'prod_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.ambient') + ' (L)',
    field: 'trsf_qty_amb',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.standard') + ' (L)',
    field: 'trsf_qty_cor',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.mass') + ' (kg)',
    field: 'trsf_load_kg',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.density') + ' (kg/m3)',
    field: 'trsf_density',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.temp') + ' (C)',
    field: 'trsf_temp',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.api') + ' (@60F)',
    field: 'trsf_api',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.temp') + ' (F)',
    field: 'trsf_temp_f',
    sortable: true,
    resizable: true,
  },
];

export default transferColumns;
