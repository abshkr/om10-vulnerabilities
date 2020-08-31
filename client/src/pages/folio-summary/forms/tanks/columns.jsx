const columns = (t) => [
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
    field: 'tank_base',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.productName'),
    field: 'base_name',
    sortable: true,
    resizable: true,
    width: 100,
    suppressSizeToFit: true,
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
    headerName: `${t('fields.closingAmbient')} (L)`,
    field: 'close_amb_tot',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 100,
    cellEditor: 'NumericEditor',
    suppressSizeToFit: true,
  },

  {
    headerName: `${t('fields.closingCorrected')} (L)`,
    field: 'close_std_tot',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 100,
    cellEditor: 'NumericEditor',
    suppressSizeToFit: true,
  },

  {
    headerName: `${t('fields.closingMass')} (${t('units.kg')})`,
    field: 'close_mass_tot',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 100,
    cellEditor: 'NumericEditor',
    suppressSizeToFit: true,
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
    editable: true,
    cellEditor: 'NumericEditor',
    cellClass: 'editable-ag-grid-cell',
  },

  {
    headerName: `${t('fields.closingTemp')} (°C)`,
    field: 'close_temp',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 100,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      ranges: {
        max: 'max_temp',
        min: 'min_temp',
      },
    },
    options: {
      max: 'max_temp',
      min: 'min_temp',
    },
    suppressSizeToFit: true,
  },

  {
    headerName: `${t('fields.closingDensity')} (${t('units.kg/m3')})`,
    field: 'close_density',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 100,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      ranges: {
        max: 'bclass_dens_hi',
        min: 'bclass_dens_lo',
      },
    },
    options: {
      max: 'bclass_dens_hi',
      min: 'bclass_dens_lo',
    },
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.gainLossExplanation'),
    field: 'description',
    sortable: true,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
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
