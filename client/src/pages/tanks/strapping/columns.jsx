const columns = (t) => [
  {
    headerName: `${t('fields.level')} (${t('units.mm')})`,
    field: 'strap_height',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    pinned: 'left',
    width: 120,
  },
  {
    headerName: `${t('fields.observedVolume')} (${t('units.litres')})`,
    field: 'strap_volume',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    width: 220,
  },

  {
    headerName: t('fields.strapType'),
    field: 'strap_type_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    width: 180,
  },

  {
    headerName: t('fields.tank'),
    field: 'strap_tankcode',
    filter: 'FuzzyFilter',
    sortable: false,
    resizable: true,
    width: 120,
  },
  {
    headerName: t('fields.terminal'),
    field: 'strap_sitecode',
    filter: 'FuzzyFilter',
    sortable: false,
    resizable: true,
    width: 120,
  },
  {
    headerName: t('fields.baseProductCode'),
    field: 'strap_basecode',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    width: 180,
  },

  {
    headerName: t('fields.baseProductName'),
    field: 'strap_basename',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    width: 200,
  },
];

export default columns;
