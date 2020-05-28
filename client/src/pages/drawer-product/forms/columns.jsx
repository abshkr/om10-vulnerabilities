const columns = (t, isCreating) => [
  {
    headerName: t('fields.baseProductCode'),
    field: 'pitem_base_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 180,
  },
  {
    headerName: t('fields.baseProductName'),
    field: 'pitem_base_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 130,
  },
  {
    headerName: t('fields.ratio'),
    field: 'pitem_ratio_value',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.blendToleranceCheck'),
    field: 'pitem_bltol_flag',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.lowerLimit'),
    field: 'pitem_bltol_ntol',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.upperLimit'),
    field: 'pitem_bltol_ptol',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
];

export default columns;
