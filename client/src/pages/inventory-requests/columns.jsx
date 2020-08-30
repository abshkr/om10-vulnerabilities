const columns = (t) => {
  return [
    {
      headerName: t('fields.type'),
      field: 'tkrq_type_name',
      filter: 'MultiFilter',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.periodRequest'),
      field: 'tkrq_period_name',
      filter: 'MultiFilter',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.date'),
      field: 'tkrq_due',
      sortable: true,
      resizable: true,
      cellRenderer: 'DateRenderer',
    },
    {
      headerName: t('fields.time'),
      field: 'time',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.dayOfWeek'),
      field: 'day_of_week',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
    },
    {
      headerName: t('fields.depot'),
      field: 'tkrq_depot',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
    },
    {
      headerName: t('fields.all'),
      field: 'tkrq_allflag',
      sortable: true,
      resizable: true,
      filter: 'BooleanFilter',
      cellRenderer: 'BooleanRenderer',
    },
  ];
};
export default columns;
