const columns = (t) => [
  {
    headerName: t('fields.axleLimitTypeId'),
    field: 'axle_limit_type_id',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.axleLimitTypeCode'),
    field: 'axle_limit_type_code',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.axleLimitType'),
    field: 'axle_limit_type_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.axleGroupId'),
    field: 'axle_group_id',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },
  {
    headerName: t('fields.axleGroup'),
    field: 'axle_group_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.axleWeightLimit') + ' (' + t('units.kg') + ')',
    field: 'axle_weight_limit',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
];

export default columns;
