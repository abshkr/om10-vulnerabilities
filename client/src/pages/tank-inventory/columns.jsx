const columns = (t, config) => [
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
    headerName: t('fields.waterLevel') + ' (' + t('units.mm') + ')',
    field: 'tank_water_lvl',
    sortable: true,
    resizable: true,
    hide: !config?.useWaterStrapping,
  },
  {
    headerName: t('fields.waterVolume') + ' (' + t('units.ltr') + ')',
    field: 'tank_water',
    sortable: true,
    resizable: true,
    hide: true,
  },
  {
    headerName: `${t('fields.tankLevel')} (${t('units.mm')})`,
    field: 'tank_prod_lvl',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.tankIFC') + ' (' + t('units.ltr') + ')',
    field: 'tank_ifc',
    sortable: true,
    resizable: true,
    hide: !config?.useWaterStrapping,
  },
  {
    headerName: `${t('fields.temperature')} (°C)`,
    field: 'tank_temp',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.standardVolume')} (${t(config?.siteLabelUser + 'units.lcor')})`,
    field: 'netvol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.observedVolume')} (${t(config?.siteLabelUser + 'units.lobs')})`,
    field: 'grossvol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.pumpableVolume')} (${t(config?.siteLabelUser + 'units.lobs')})`,
    field: 'pumpablevol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.openingStock')} (${t(config?.siteLabelUser + 'units.lcor')})`,
    field: 'usablevol',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.bookBalance')} (${t(config?.siteLabelUser + 'units.lcor')})`,
    field: 'bookbalance',
    sortable: true,
    resizable: true,
  },
];

export default columns;
