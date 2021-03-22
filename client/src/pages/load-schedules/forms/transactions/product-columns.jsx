const productColumns = (t) => [
  {
    headerName: t('fields.code'),
    field: 'base_code',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.name'),
    field: 'base_name',
    sortable: true,
    resizable: true,
    width: 180,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.tankCode'),
    field: 'trsb_tk_tankcode',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.ambient') + ' (' + t('units.ltr') + ')',
    field: 'trsb_avl',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.standard') + ' (' + t('units.ltr') + ')',
    field: 'trsb_cvl',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.mass') + ' (' + t('units.kg') + ')',
    field: 'trsb_kg',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.density') + ' (' + t('units.kg/m3') + ')',
    field: 'trsb_dns',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.temp') + ' (' + t('units.degC') + ')',
    field: 'trsb_tmp',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.api'),
    field: 'trsb_api',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.temp') + ' (' + t('units.degF') + ')',
    field: 'trsb_tmp_f',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.batch'),
    field: 'trsb_batch_no',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
  },
];

export default productColumns;
