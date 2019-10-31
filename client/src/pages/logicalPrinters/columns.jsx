const columns = (config, t) => [
  {
    headerName: t('fields.companyCode'),
    field: 'prt_cmpy',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.companyCode'),
    field: 'prt_cmpy_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.usageId'),
    field: 'prt_usage',
    filter: 'MultiFilter',
    filterable: true,
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.usage'),
    field: 'prt_usage_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.printer'),
    field: 'prt_printer',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.systemPrinter'),
    field: 'sys_printer',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.areaId'),
    field: 'prt_area',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.areaLocation'),
    field: 'area_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
];

export default columns;
