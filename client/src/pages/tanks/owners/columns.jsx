const columns = (t, config) => [
  {
    headerName: t('fields.terminal'),
    field: 'tank_sitedesc',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 160,
    suppressSizeToFit: true,
    hide: true, // !config?.siteUseMultiTerminals,
  },
  {
    headerName: t('fields.tkownerCode'),
    field: 'tkcmpy_link',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.tkownerName'),
    field: 'cmpy_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 280,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.schdSupplier'),
    field: 'supplier',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
    suppressSizeToFit: true,
    hide: true,
  },

  {
    headerName: t('fields.tankCode'),
    field: 'tklink_tankcode',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.tankName'),
    field: 'tank_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.terminal'),
    field: 'tklink_tankdepo',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.terminal'),
    field: 'tank_sitename',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.productCode'),
    field: 'tank_base',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 140,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.productName'),
    field: 'tank_base_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 160,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.productCategory'),
    field: 'tank_bclass_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
    hide: true,
  },

  {
    headerName: t('fields.tkoPercentage'),
    field: 'tko_percentage',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '4',
      min: '0',
    },
  },
  {
    headerName: t('fields.tkownerQty') + ' (' + t('units.ltr') + ')',
    field: 'tkowner_qty',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '0',
    },
  },

  {
    headerName: t('fields.tkoStdLtr') + ' (' + t('units.ltr') + ')',
    field: 'tko_std_ltr',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '0',
    },
  },
  {
    headerName: t('fields.tkoAmbLtr') + ' (' + t('units.ltr') + ')',
    field: 'tko_amb_ltr',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
    hide: true,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '0',
    },
  },
  {
    headerName: t('fields.tkoKg') + ' (' + t('units.kg') + ')',
    field: 'tko_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
    cellRenderer: 'QuantityRenderer',
    cellRendererParams: {
      digits: '0',
      min: '0',
    },
  },

  {
    headerName: t('fields.tkoIn') + ' (' + t('units.ltr') + ')',
    field: 'tko_in',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.tkoInKg') + ' (' + t('units.kg') + ')',
    field: 'tko_in_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.tkoInTotal') + ' (' + t('units.ltr') + ')',
    field: 'tko_in_total',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.tkoOut') + ' (' + t('units.ltr') + ')',
    field: 'tko_out',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.tkoOutKg') + ' (' + t('units.kg') + ')',
    field: 'tko_out_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.tkoOutTotal') + ' (' + t('units.ltr') + ')',
    field: 'tko_out_total',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.tkoOutPrmv') + ' (' + t('units.ltr') + ')',
    field: 'tko_out_prmv',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.tkoOutLd') + ' (' + t('units.ltr') + ')',
    field: 'tko_out_ld',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.tkoAdjStd') + ' (' + t('units.ltr') + ')',
    field: 'tko_adj_std',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.tkoAdjAmb') + ' (' + t('units.ltr') + ')',
    field: 'tko_adj_amb',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.tkoAdjKg') + ' (' + t('units.kg') + ')',
    field: 'tko_adj_kg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
    suppressSizeToFit: true,
    hide: true,
  },
];

export default columns;
