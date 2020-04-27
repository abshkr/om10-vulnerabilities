const columns = (t) => [
  {
    headerName: `${t('fields.level')} (${t('units.mm')})`,
    field: 'strap_height',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    pinned: 'left',
    width: 150,
  },
  {
    headerName: `${t('fields.observedVolume')} (${t('units.litres')})`,
    field: 'strap_volume',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    width: 300,
  },
  {
    headerName: t('fields.tankCode'),
    field: 'strap_tankcode',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.tankName'),
    field: 'strap_tankname',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },
  {
    headerName: t('fields.terminalCode'),
    field: 'strap_sitecode',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },

  {
    headerName: t('fields.terminal'),
    field: 'strap_sitename',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },

  {
    headerName: t('fields.productCode'),
    field: 'strap_basecode',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },

  {
    headerName: t('fields.productName'),
    field: 'strap_basename',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },

  {
    headerName: t('fields.productCategory'),
    field: 'strap_bsclsname',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
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
