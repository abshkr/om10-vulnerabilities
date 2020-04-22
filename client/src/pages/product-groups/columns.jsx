const columns = (t) => [
  {
    headerName: t('fields.code'),
    field: 'pgr_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.name'),
    field: 'pgr_description',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.unitId'),
    field: 'pgr_unit',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.unit'),
    field: 'pgr_unitname',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.numberOfDrawerProducts'),
    field: 'products_amount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
];

export default columns;
