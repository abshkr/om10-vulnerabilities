const columns = t => [
  {
    headerName: t('fields.gate'),
    field: 'hzcf_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true
  },
  {
    headerName: t('fields.deviceCode'),
    field: 'hzcf_un_num',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.deviceType'),
    field: 'hzcf_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.area'),
    field: 'hzcf_sub_risk',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.areaName'),
    field: 'hzcf_class',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.gateTimeCode'),
    field: 'hzcf_hz_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.gateUser'),
    field: 'hzcf_emrg',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  }
];

export default columns;
