const columns = t => [
  {
    headerName: t('fields.code'),
    field: 'metercode',
    filter: 'FuzzyFilter',
    filterable: true,
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.type'),
    field: 'metertype',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.typeName'),
    field: 'metertypename',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.observedVolume'),
    field: 'observedvolume',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.standardVolume'),
    field: 'standardvolume',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.mass'),
    field: 'mass',
    sortable: true,
    resizable: true,
  },
];

export default columns;
