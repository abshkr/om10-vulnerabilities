const transferColumns = (t) => [
  {
    headerName: t('fields.transfer'),
    field: 'trsf_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
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
    headerName: t('fields.ambient') + ' (' + t('units.ltr') + ')',
    field: 'trsf_qty_amb',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.standard') + ' (' + t('units.ltr') + ')',
    field: 'trsf_qty_cor',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.mass') + ' (' + t('units.kg') + ')',
    field: 'trsf_load_kg',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.density') + ' (' + t('units.kg/m3') + ')',
    field: 'trsf_density',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.temp') + ' (' + t('units.degC') + ')',
    field: 'trsf_temp',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.api'),
    field: 'trsf_api',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.temp') + ' (' + t('units.degF') + ')',
    field: 'trsf_temp_f',
    sortable: true,
    resizable: true,
  },
];

export default transferColumns;
