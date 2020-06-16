const columns = (t) => [
  {
    headerName: t('fields.companyCode'),
    field: 'cmpy_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 220,
  },
  {
    headerName: t('fields.companyName'),
    field: 'cmpy_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 380,
  },
  {
    headerName: t('fields.plantCode'),
    field: 'cmpy_plant',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.aoiNumber'),
    field: 'cmpy_aoi',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    width: 130,
  },
  {
    headerName: t('fields.siteManager'),
    field: 'site_manager',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.supplier'),
    field: 'supplier',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.carrier'),
    field: 'carrier',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.customer'),
    field: 'customer',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.drawer'),
    field: 'drawer',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.issuer'),
    field: 'issuer',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.employer'),
    field: 'employer',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.host'),
    field: 'host',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
  },
];

export default columns;
