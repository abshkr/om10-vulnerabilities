const columns = (t) => [
  {
    headerName: `${t('fields.level')} (${t('units.mm')})`,
    field: 'strap_height',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    pinned: 'left',
    width: 50,
  },
  {
    headerName: `${t('fields.observedVolume')} (${t('units.litres')})`,
    field: 'strap_volume',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },

  {
    headerName: `${t('fields.productLevel')} (${t('units.mm')})`,
    field: 'strap_tanklevel',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },
];

export default columns;
