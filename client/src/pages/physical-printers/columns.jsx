const columns = (configuration, t) => [
  {
    headerName: 'Logical Printer',
    field: 'prntr',
    sortable: true,
    filter: 'fuzzySearch',
    resizable: true,
  },
  {
    headerName: 'System / Physical Printer',
    field: 'sys_prntr',
    sortable: true,
    filter: 'fuzzySearch',
    resizable: true,
  },
  {
    headerName: 'Lock',
    field: 'prntr_lock',
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    headerName: 'Area Id',
    field: 'prntr_area',
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    headerName: 'Area Location',
    field: 'area_name',
    sortable: true,
    resizable: true,
    filter: 'multiSelect',
  },
];

export default columns;
