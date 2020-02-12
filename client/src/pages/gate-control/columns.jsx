const columns = t => [
  {
    headerName: t('fields.gate'),
    field: 'gate_k',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true
  },
  {
    headerName: t('fields.deviceCode'),
    field: 'gate_dvce',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.deviceType'),
    field: 'krdc_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.area'),
    field: 'area_k',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.areaName'),
    field: 'area_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.gateTimeCode'),
    field: 'g_tcd',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true
  }
];

export default columns;
