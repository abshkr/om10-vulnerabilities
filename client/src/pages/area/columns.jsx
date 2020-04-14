const columns = (t) => [
  {
    headerName: t('fields.areaId'),
    field: 'area_k',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    width: 200,
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
    headerName: t('fields.gates'),
    field: 'gatesNames',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    cellRenderer: 'TagRenderer',
  },
];

export default columns;
