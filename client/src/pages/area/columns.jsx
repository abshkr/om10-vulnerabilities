const columns = (t) => [
  {
    headerName: t('fields.areaId'),
    field: 'area_k',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.areaName'),
    field: 'area_name',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    width: 200,
  },
  {
    headerName: t('fields.areaGateCount'),
    field: 'gate_count',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    width: 200,
  },
  {
    headerName: t('fields.areaGateList'),
    field: 'gate_list',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    width: 400,
  },
];

export default columns;
