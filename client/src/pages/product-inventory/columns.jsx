const columns = (t, config) => [
  {
    headerName: t('fields.baseProductCode'),
    field: 'base_code',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.baseProductName'),
    field: 'base_name',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.bookBalance'),
    field: 'bookbalance',
    sortable: true,
    resizable: true,
    cellRenderer: 'SeperatorRenderer',
    cellRendererParams: {
      type: String(config?.decimal_thousand_separator),
    },
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.grossVolume'),
    field: 'grossvol',
    sortable: true,
    resizable: true,
    cellRenderer: 'SeperatorRenderer',
    cellRendererParams: {
      type: String(config?.decimal_thousand_separator),
    },
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.netVolume'),
    field: 'netvol',
    sortable: true,
    resizable: true,
    cellRenderer: 'SeperatorRenderer',
    cellRendererParams: {
      type: String(config?.decimal_thousand_separator),
    },
  },
  {
    headerName: t('fields.ullage'),
    field: 'ullage',
    sortable: true,
    resizable: true,
    hide: !config?.siteUllageCalcAuto,
    cellRenderer: 'SeperatorRenderer',
    cellRendererParams: {
      type: String(config?.decimal_thousand_separator),
    },
  },
  {
    headerName: t('fields.usableVolume'),
    field: 'usablevol',
    sortable: true,
    resizable: true,
    cellRenderer: 'SeperatorRenderer',
    cellRendererParams: {
      type: String(config?.decimal_thousand_separator),
    },
  },
];

export default columns;
