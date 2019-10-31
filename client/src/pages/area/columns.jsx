const columns = t => [
  {
    headerName: t('fields.areaId'),
    field: 'area_k',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
  },
  {
    headerName: t('fields.areaName'),
    field: 'area_name',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
  },
];

export default columns;
