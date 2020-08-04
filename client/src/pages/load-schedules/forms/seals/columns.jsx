const columns = (t, editable) => [
  {
    headerName: t('fields.prefix'),
    field: 'seal_prefix',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: editable && true,
    cellClass: editable && 'editable-ag-grid-cell',
    cellEditor: 'agTextCellEditor',
    width: 140,
  },
  {
    headerName: t('fields.sealNumber'),
    field: 'seal_nr',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 120,
  },
  {
    headerName: t('fields.suffix'),
    field: 'seal_suffix',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    editable: editable && true,
    cellClass: editable && 'editable-ag-grid-cell',
    cellEditor: 'agTextCellEditor',
  },
];

export default columns;
