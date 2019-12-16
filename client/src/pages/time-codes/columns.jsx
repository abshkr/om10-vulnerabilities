const columns = (config, t) => [
  {
    headerName: t('fields.title'),
    field: 'tcd_title',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.monday'),
    field: 'tcd_mon',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.tuesday'),
    field: 'tcd_tue',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.wednesday'),
    field: 'tcd_wed',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.thursday'),
    field: 'tcd_thu',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.friday'),
    field: 'tcd_fri',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.saturday'),
    field: 'tcd_sat',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.sunday'),
    field: 'tcd_sun',
    sortable: true,
    resizable: true,
  },
];

export default columns;
