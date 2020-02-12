const columns = t => [
  {
    headerName: t('fields.tankCode'),
    field: 'tank_code',
    sortable: true,
    resizable: true,
    width: 80,
  },
  {
    headerName: t('fields.productCode'),
    field: 'tank_base',
    sortable: true,
    resizable: true,
    width: 80,
  },

  {
    headerName: t('fields.productName'),
    field: 'base_name',
    sortable: true,
    resizable: true,
    width: 100,
  },

  {
    headerName: t('fields.class'),
    field: 'bclass_desc',
    sortable: true,
    resizable: true,
    width: 100,
  },

  {
    headerName: `${t('fields.closingAmbient')} (L)`,
    field: 'close_amb_tot',
    sortable: true,
    resizable: true,
    editable: true,
    width: 100,
    cellEditor: 'NumericEditor',
  },

  {
    headerName: `${t('fields.closingCorrected')} (L)`,
    field: 'close_std_tot',
    sortable: true,
    resizable: true,
    editable: true,
    width: 100,
    cellEditor: 'NumericEditor',
  },

  {
    headerName: `${t('fields.closingMass')} (Kg)`,
    field: 'close_mass_tot',
    sortable: true,
    resizable: true,
    editable: true,
    width: 100,
    cellEditor: 'NumericEditor',
  },

  {
    headerName: `${t('fields.calculate')}`,
    field: 'tank_code',
    width: 80,
    resizable: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    cellRenderer: 'NullRenderer',
  },

  {
    headerName: `${t('fields.tankLevel')} (mm)`,
    field: 'tank_prod_lvl',
    sortable: true,
    resizable: true,
    width: 100,
    editable: true,
    cellEditor: 'NumericEditor',
  },

  {
    headerName: `${t('fields.closingTemp')} (°C)`,
    field: 'close_temp',
    sortable: true,
    resizable: true,
    editable: true,
    width: 100,
    cellEditor: 'NumericEditor',
    options: {
      max: 'max_temp',
      min: 'min_temp',
    },
  },

  {
    headerName: `${t('fields.closingDensity')} (Kg/m3)`,
    field: 'close_density',
    sortable: true,
    resizable: true,
    editable: true,
    width: 100,
    cellEditor: 'NumericEditor',
    options: {
      max: 'bclass_dens_hi',
      min: 'bclass_dens_lo',
    },
  },

  {
    headerName: t('fields.gainLossExplanation'),
    field: 'description',
    sortable: true,
    resizable: true,
    editable: true,
    width: 160,
  },

  {
    headerName: t('fields.lastModifiedBy'),
    field: 'user_code',
    sortable: true,
    resizable: true,
    width: 100,
  },

  {
    headerName: t('fields.lastModified'),
    field: 'last_chg_time',
    sortable: true,
    resizable: true,
    width: 160,
    cellRenderer: 'DateRenderer',
  },
];

export default columns;
