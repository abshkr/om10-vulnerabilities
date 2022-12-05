const columns = (t, enabled, config) => [
  {
    headerName: t('fields.tankCode'),
    field: 'tank_code',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
    pinned: 'left',
  },
  {
    headerName: t('fields.productCode'),
    field: 'tank_basecode',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.productName'),
    field: 'tank_basename',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.productCode'),
    field: 'curr_basecode',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.productName'),
    field: 'curr_basename',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.class'),
    field: 'bclass_desc',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: `${t(config?.siteLabelUser + 'fields.closingAmbient')} (${t('units.ltr')})`,
    field: 'close_amb_tot',
    sortable: true,
    resizable: true,
    editable: enabled,
    cellClass: enabled ? 'editable-ag-grid-cell' : '',
    width: 100,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      // ranges: {
      //   max: 999999999,
      //   min: 0,
      // },
      t,
    },
    suppressSizeToFit: true,
  },
  {
    headerName: `${t(config?.siteLabelUser + 'fields.closingCorrected')} (${t('units.ltr')})`,
    field: 'close_std_tot',
    sortable: true,
    resizable: true,
    editable: enabled,
    cellClass: enabled ? 'editable-ag-grid-cell' : '',
    width: 100,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      // ranges: {
      //   max: 999999999,
      //   min: 0,
      // },
      t,
    },
    suppressSizeToFit: true,
  },
  {
    headerName: `${t(config?.siteLabelUser + 'fields.closingMass')} (${t('units.kg')})`,
    field: 'close_mass_tot',
    sortable: true,
    resizable: true,
    editable: enabled,
    // hide: !config?.siteMassInVacuum,
    cellClass: enabled ? 'editable-ag-grid-cell' : '',
    width: 100,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      // ranges: {
      //   max: 999999999,
      //   min: 0,
      // },
      t,
    },
    suppressSizeToFit: true,
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.closingMassAir') + ' (' + t('units.kg') + ')',
    field: 'close_mass_tot_air',
    sortable: true,
    resizable: true,
    hide: !config?.siteMassInAir,
    cellRenderer: 'MassInAirRenderer',
    cellRendererParams: {
      digits: String(config?.precisionMass),
      massInVacuum: 'close_mass_tot',
      standardVolume: 'close_std_tot',
      factor: config?.airBuoyancyFactor,
    },
  },

  {
    headerName: t('fields.openingDateTime'),
    field: 'base_period_open',
    cellRenderer: 'DateRenderer',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.siteFolioTankBaseChange,
    suppressSizeToFit: true,
    width: 180,
  },
  {
    headerName: t('fields.closingDateTime'),
    field: 'base_period_close',
    cellRenderer: 'DateRenderer',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.siteFolioTankBaseChange,
    suppressSizeToFit: true,
    width: 180,
  },

  {
    headerName: t('fields.vcf'),
    field: 'close_vcf_tot',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !config?.siteUseVCF,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: String(config?.precisionVCF),
      min: '0',
    },
  },
  {
    headerName: `${t('fields.calculate')}`,
    field: 'tank_code',
    width: 80,
    resizable: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    cellRenderer: 'NullRenderer',
    suppressSizeToFit: true,
  },
  {
    headerName: `${t('fields.tankLevel')} (${t('units.mm')})`,
    field: 'tank_prod_lvl',
    sortable: true,
    resizable: true,
    width: 100,
    editable: enabled,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      // ranges: {
      //   max: 999999999,
      //   min: 0,
      // },
      t,
    },
    cellClass: enabled ? 'editable-ag-grid-cell' : '',
  },
  {
    headerName: `${t('fields.tankWaterLevel')} (${t('units.mm')})`,
    field: 'tank_water_lvl',
    hide: !config?.useWaterStrapping,
    sortable: true,
    resizable: true,
    width: 100,
    editable: enabled,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      // ranges: {
      //   max: 999999999,
      //   min: 0,
      // },
      t,
    },
    cellClass: enabled ? 'editable-ag-grid-cell' : '',
  },
  {
    headerName: `${t('fields.tankIFC')}`,
    field: 'tank_ifc',
    hide: !config?.useWaterStrapping,
    sortable: true,
    resizable: true,
    width: 100,
    editable: enabled,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      // ranges: {
      //   max: 999999999,
      //   min: 0,
      // },
      t,
    },
    cellClass: enabled ? 'editable-ag-grid-cell' : '',
  },
  {
    headerName: `${t('fields.closingTemp')} (°C)`,
    field: 'close_temp',
    sortable: true,
    resizable: true,
    editable: enabled,
    cellClass: enabled ? 'editable-ag-grid-cell' : '',
    width: 100,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      ranges: {
        max: 'max_temp',
        min: 'min_temp',
      },
      t,
    },
    options: {
      max: 'max_temp',
      min: 'min_temp',
    },
    suppressSizeToFit: true,
    cellRenderer: 'TemperatureRenderer',
    cellRendererParams: {
      digits: String(config?.precisionTemperature),
    },
  },
  {
    headerName: `${t('fields.closingDensity')} (${t('units.kg/m3')})`,
    field: 'close_density',
    sortable: true,
    resizable: true,
    editable: enabled,
    cellClass: enabled ? 'editable-ag-grid-cell' : '',
    width: 100,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      ranges: {
        max: 'bclass_dens_hi',
        min: 'bclass_dens_lo',
      },
      t,
    },
    options: {
      max: 'bclass_dens_hi',
      min: 'bclass_dens_lo',
    },
    suppressSizeToFit: true,
    cellRenderer: 'DensityRenderer',
    cellRendererParams: {
      digits: String(config?.precisionDensity),
    },
  },
  {
    headerName: t('fields.gainLossExplanation'),
    field: 'description',
    sortable: true,
    resizable: true,
    editable: enabled,
    cellClass: enabled ? 'editable-ag-grid-cell' : '',
    width: 160,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.lastModifiedBy'),
    field: 'user_code',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.lastModified'),
    field: 'last_chg_time',
    sortable: true,
    resizable: true,
    width: 160,
    cellRenderer: 'DateRenderer',
    suppressSizeToFit: true,
  },
];

export default columns;
