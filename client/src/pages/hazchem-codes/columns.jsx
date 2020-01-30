const columns = t => [
  {
    headerName: t('fields.id'),
    field: 'hzcf_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.unNumber'),
    field: 'hzcf_un_num',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.technicalName'),
    field: 'hzcf_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.subsidiaryRisk'),
    field: 'hzcf_sub_risk',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.class'),
    field: 'hzcf_class',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.emergencyActionCode'),
    field: 'hzcf_hz_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.emergencyProcedureGuide'),
    field: 'hzcf_emrg',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.packagingGroup'),
    field: 'hzcf_pack_group',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.packagingMethod'),
    field: 'hzcf_pack_method',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  }
];

export default columns;
