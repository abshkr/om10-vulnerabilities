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
];

export default columns;
