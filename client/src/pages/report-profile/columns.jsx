const columns = t => [
  {
    headerName: t('fields.reportJasperFileExist'),
    field: 'source_exists',
    sortable: true,
    resizable: true,
    filter: 'BooleanFilter',
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.reportJasperFile'),
    field: 'report_jasper_file',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.type'),
    field: 'report_type_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },
  {
    headerName: t('fields.name'),
    field: 'report_name',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.description'),
    field: 'report_desc',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.onDemandReport'),
    field: 'report_ondemand_flag',
    sortable: true,
    resizable: true,
    filter: 'BooleanFilter',
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.closeOutReport'),
    field: 'report_closeout_flag',
    sortable: true,
    resizable: true,
    filter: 'BooleanFilter',
    cellRenderer: 'BooleanRenderer',
  },
  {
    headerName: t('fields.closeOutReportBy'),
    field: 'report_closeout_flag2_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },
];

export default columns;
