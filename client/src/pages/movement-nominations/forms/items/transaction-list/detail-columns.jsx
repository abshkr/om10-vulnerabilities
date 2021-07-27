const detailColumns = (t, config) => [
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
    headerName: t(config?.siteLabelUser + 'fields.ambient') + ' (' + t('units.ltr') + ')',
    field: 'trsb_avl',
    sortable: true,
    resizable: true,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: String(config?.precisionVolume),
      min: '100',
      adtvFlag: 'base_cat',
      adtvDigits: config?.precisionAdditive,
    },
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.standard') + ' (' + t('units.ltr') + ')',
    field: 'trsb_cvl',
    sortable: true,
    resizable: true,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: String(config?.precisionVolume),
      min: '100',
      adtvFlag: 'base_cat',
      adtvDigits: config?.precisionAdditive,
    },
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.mass') + ' (' + t('units.kg') + ')',
    field: 'trsb_kg',
    sortable: true,
    resizable: true,
    hide: !config?.siteMassInVacuum,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: String(config?.precisionMass),
      min: '100',
      adtvFlag: 'base_cat',
      adtvDigits: config?.precisionAdditive,
    },
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.massInAir') + ' (' + t('units.kg') + ')',
    field: 'trsb_air_kg',
    sortable: true,
    resizable: true,
    hide: !config?.siteMassInAir,
    cellRenderer: 'MassInAirRenderer',
    cellRendererParams: {
      digits: String(config?.precisionMass),
      massInVacuum: 'trsb_kg',
      standardVolume: 'trsb_cvl',
      factor: config?.airBuoyancyFactor,
    },
  },
  {
    headerName: t('fields.density') + ' (' + t('units.kg/m3') + ')',
    field: 'trsb_dns',
    sortable: true,
    resizable: true,
    cellRenderer: 'DensityRenderer',
    cellRendererParams: {
      digits: String(config?.precisionDensity),
    },
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
    headerName: t('fields.tankBatchNumber'),
    field: 'trsb_batch_no',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    hide: !config?.siteUseTankBatch,
  },
];

export default detailColumns;
