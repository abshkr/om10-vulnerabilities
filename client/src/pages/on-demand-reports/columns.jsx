const columns = (t) => {
  return [
    {
      headerName: t('fields.id'),
      field: 'closeout_nr',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.openingTime'),
      field: 'start_date',
      cellRenderer: 'DateRenderer',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.closingTime'),
      field: 'end_date',
      sortable: true,
      resizable: true,
      cellRenderer: 'DateRenderer',
    },
  ];
};
export default columns;
