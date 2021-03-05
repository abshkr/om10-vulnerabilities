const columns = (t, enable_meter_facor) => [
  {
    headerName: t('fields.meterUsage'),
    field: 'bam_usage_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.meterCode'),
    field: 'bam_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.meterType'),
    field: 'bam_type_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.meterQuantityType'),
    field: 'bam_qty_typename',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.meterName'),
    field: 'bam_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.minimumFlow'),
    field: 'bam_min_flow',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.maximumFlow'),
    field: 'bam_max_flow',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.kFactor'),
    field: 'bam_kfa',
    filter: 'FuzzyFilter',
    width: 110,
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.meterFactor'),
    field: 'bam_factor',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: !enable_meter_facor
  },
  {
    headerName: t('fields.lastModified'),
    field: 'bam_last_mod',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'DateRenderer',
  },
];

export default columns;
