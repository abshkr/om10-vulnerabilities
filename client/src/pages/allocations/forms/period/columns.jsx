const columns = (t) => [
  {
    headerName: t('fields.type'),
    field: 'aiprd_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.company'),
    field: 'aiprd_cmpyname',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.supplier'),
    field: 'aiprd_suppname',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.product'),
    field: 'aiprd_prodname',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.unit'),
    field: 'aiprd_unitname',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.period'),
    field: 'aiprd_index',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.quantityAllocated'),
    field: 'aiprd_qtylimit',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.startDate'),
    field: 'aiprd_daystart',
    sortable: true,
    resizable: true,
    cellRenderer: 'DateRenderer',
  },

  {
    headerName: t('fields.endDate'),
    field: 'aiprd_dayend',
    sortable: true,
    resizable: true,
    cellRenderer: 'DateRenderer',
  },
];

export default columns;
