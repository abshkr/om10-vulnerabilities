const columns = (t) => [
  {
    headerName: `${t('fields.level')} (${t('units.mm')})`,
    field: 'strap_height',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    pinned: 'left',
    width: 80,
  },
  {
    headerName: `${t('fields.observedVolume')} (${t('units.litres')})`,
    field: 'strap_volume',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },

  {
    headerName: t('fields.baseProductCode'),
    field: 'strap_basecode',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },

  {
    headerName: t('fields.baseProductName'),
    field: 'strap_basename',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },
];

export default columns;
