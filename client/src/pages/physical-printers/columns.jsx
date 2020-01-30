const columns = t => [
  {
    headerName: t('fields.logicalPrinter'),
    field: 'prntr',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.systemPrinter'),
    field: 'sys_prntr',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true
  },
  {
    headerName: t('fields.locked'),
    field: 'prntr_lock',
    sortable: true,
    resizable: true,
    filter: 'BooleanFilter',
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: t('fields.areaId'),
    field: 'prntr_area',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter'
  },
  {
    headerName: t('fields.areaLocation'),
    field: 'area_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter'
  }
];

export default columns;
