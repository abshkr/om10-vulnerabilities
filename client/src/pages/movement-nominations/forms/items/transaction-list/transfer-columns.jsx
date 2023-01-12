const transferColumns = (t, config) => [
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
    headerName: t(config?.siteLabelUser + 'fields.ambient') + ' (' + t('units.ltr') + ')',
    field: 'trsf_qty_amb',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: String(config?.precisionVolume),
      min: '100',
    },
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.standard') + ' (' + t('units.ltr') + ')',
    field: 'trsf_qty_cor',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: String(config?.precisionVolume),
      min: '100',
    },
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.mass') + ' (' + t('units.kg') + ')',
    field: 'trsf_load_kg',
    sortable: true,
    resizable: true,
    hide: !config?.siteMassInVacuum,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: String(config?.precisionMass),
      min: '100',
    },
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.massInAir') + ' (' + t('units.kg') + ')',
    field: 'trsf_air_kg',
    sortable: true,
    resizable: true,
    hide: !config?.siteMassInAir,
    cellRenderer: 'MassInAirRenderer',
    cellRendererParams: {
      digits: String(config?.precisionMass),
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
    cellRenderer: 'DensityRenderer',
    cellRendererParams: {
      digits: String(config?.precisionDensity),
    },
  },
  {
    headerName: t('fields.temp') + ' (' + t('units.degC') + ')',
    field: 'trsf_temp',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'TemperatureRenderer',
    cellRendererParams: {
      digits: String(config?.precisionTemperature),
    },
  },

  {
    headerName: t('fields.vcf'),
    field: 'trsf_vcf',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.siteUseVCF,
    cellRenderer: 'VcfRenderer',
    cellRendererParams: {
      digits: String(config?.precisionVCF),
      ambientVolume: 'trsf_qty_amb',
      standardVolume: 'trsf_qty_cor',
    },
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
