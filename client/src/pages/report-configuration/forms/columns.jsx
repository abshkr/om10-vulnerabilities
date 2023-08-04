const columns = (t, form, units) => [
  {
    headerName: t('fields.jobID'),
    field: 'job_id',
    resizable: true,
    width: 80,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.jobName'),
    field: 'job_name',
    resizable: true,
    width: 260,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.jobCompany'),
    field: 'job_owner',
    resizable: true,
    width: 100,
    filter: 'MultiFilter',
  },
  {
    headerName: t('fields.lastRun'),
    field: 'job_lastrun',
    resizable: true,
    width: 120,
    cellRenderer: 'DateRenderer',
  },
  {
    headerName: t('fields.enabled'),
    field: 'job_enabled',
    resizable: true,
    width: 60,
    cellRenderer: 'BooleanRenderer',
  },
];

export default columns;
