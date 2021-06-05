const columns = (t, config) => [
  {
    headerName: t('fields.code'),
    field: 'metercode',
    filter: 'FuzzyFilter',
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
    headerName: t(config?.siteLabelUser + 'fields.observedVolume'),
    field: 'observedvolume',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.standardVolume'),
    field: 'standardvolume',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.mass'),
    field: 'mass',
    sortable: true,
    resizable: true,
    hide: !config?.siteMassInVacuum,
  },
  {
    headerName: t(config?.siteLabelUser + 'fields.massInAir'),
    field: 'mass_in_air',
    sortable: true,
    resizable: true,
    hide: !config?.siteMassInAir,
    // cellRenderer: 'MassInAirRenderer',
    // cellRendererParams: {
    //   digits: '3',
    //   massInVacuum: 'mass',
    //   standardVolume: 'standardvolume',
    //   factor: config?.airBuoyancyFactor,
    // },
  },
];

export default columns;
