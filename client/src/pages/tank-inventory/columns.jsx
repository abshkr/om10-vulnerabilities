const columns = t => [
  {
    headerName: t('fields.code'),
    field: 'tank_code',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    width: 90,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.location'),
    field: 'tank_location',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.baseProductName'),
    field: 'base_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },
  {
    headerName: `${t('fields.tankLevel')} (${t('units.mm')})`,
    field: 'tank_prod_lvl',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.temperature')} (°C)`,
    field: 'tank_temp',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.standardVolume')} (${t('units.lcor')})`,
    field: 'netvol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.observedVolume')} (${t('units.lobs')})`,
    field: 'grossvol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.pumpableVolume')} (${t('units.lobs')})`,
    field: 'pumpablevol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.openingStock')} (${t('units.lcor')})`,
    field: 'usablevol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.bookBalance')} (${t('units.lcor')})`,
    field: 'bookbalance',
    sortable: true,
    resizable: true,
  },
];

export default columns;
