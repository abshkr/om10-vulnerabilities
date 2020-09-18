const columns = t => [
  {
    headerName: t('fields.day'),
    field: 'day',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    width: 350,
    pinned: 'left',
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true
  },

  {
    headerName: '00:00',
    field: '0',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '01:00',
    field: '1',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '02:00',
    field: '2',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '03:00',
    field: '3',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '04:00',
    field: '4',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '05:00',
    field: '5',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '06:00',
    field: '6',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '07:00',
    field: '7',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '08:00',
    field: '8',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '09:00',
    field: '9',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '10:00',
    field: '10',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '11:00',
    field: '11',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '12:00',
    field: '12',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '13:00',
    field: '13',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '14:00',
    field: '14',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '15:00',
    field: '15',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '16:00',
    field: '16',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '17:00',
    field: '17',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '18:00',
    field: '18',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '19:00',
    field: '19',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '20:00',
    field: '20',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '21:00',
    field: '21',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '22:00',
    field: '22',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  },
  {
    headerName: '23:00',
    field: '23',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer'
  }
];

export default columns;
