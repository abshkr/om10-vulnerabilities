const columns = t => [
  {
    headerName: t('fields.code'),
    field: 'base_code',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    pinned: 'left'
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
    resizable: true,
    cellRenderer: 'TagRenderer'
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
    filter: 'MultiFilter',
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
    filter: 'MultiFilter',
    resizable: true
  },
  {
    headerName: t('fields.isAdditive'),
    field: 'base_adtv',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: t('fields.numberOfTanks'),
    field: 'base_tank_count',
    sortable: true,
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
    resizable: true
  },
  {
    headerName: t('fields.baseClassMaxDensity'),
    field: 'base_class_dens_hi',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.baseClassMinTemp'),
    field: 'base_class_temp_lo',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.baseClassMaxTemp'),
    field: 'base_class_temp_hi',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.correctionMethod'),
    field: 'base_corr_mthd_name',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true
  },
  {
    headerName: t('fields.refTempSpec'),
    field: 'base_ref_temp_spec_name',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true
  },
  {
    headerName: t('fields.hotTempFlag'),
    field: 'base_limit_preset_ht',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true
  }
];

export default columns;
