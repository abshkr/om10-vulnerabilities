const transferColumns = (t, config) => [
  {
    headerName: t('fields.transfer'),
    field: 'trsf_id',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 110,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.bayArm'),
    field: 'baa_bay_seq',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 110,
    suppressSizeToFit: true,
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
    width: 110,
    suppressSizeToFit: true,
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
    headerName: t('fields.massInAir') + ' (' + t('units.kg') + ')',
    field: 'trsf_air_kg',
    sortable: true,
    resizable: true,
    hide: !config?.useWaterStrapping,
    cellRenderer: 'MassInAirRenderer',
    cellRendererParams: {
      digits: '3',
      massInVacuum: 'trsf_load_kg',
      standardVolume: 'trsf_qty_cor',
      factor: config?.airBuoyancyFactor,
    },
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
