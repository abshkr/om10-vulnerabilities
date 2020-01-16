const columns = t => [
  {
    headerName: t('fields.code'),
    field: 'base_code',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.name'),
    field: 'base_name',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.color'),
    field: 'base_color',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.classId'),
    field: 'base_cat',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.classification'),
    field: 'base_class_desc',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.groupCode'),
    field: 'base_prod_group',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.group'),
    field: 'base_group_name',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.isAdditive'),
    field: 'base_adtv',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.numberOfTanks'),
    field: 'base_tank_count',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.listOfTanks'),
    field: 'base_tank_list',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.baseClassMinDensity'),
    field: 'base_class_dens_lo',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.baseClassMaxDensity'),
    field: 'base_class_dens_hi',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.baseClassMinTemp'),
    field: 'base_class_temp_lo',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.baseClassMaxTemp'),
    field: 'base_class_temp_hi',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  }
];

export default columns;
