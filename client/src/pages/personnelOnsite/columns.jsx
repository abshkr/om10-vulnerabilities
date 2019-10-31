const columns = (config, t) => {
  return [
    {
      headerName: t('fields.code'),
      field: 'per_code',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter',
    },
    {
      headerName: t('fields.name'),
      field: 'per_name',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter',
    },
    {
      headerName: t('fields.company'),
      field: 'cmpy_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
    },
    {
      headerName: t('fields.areaId'),
      field: 'area_k',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
    },
    {
      headerName: t('fields.areaName'),
      field: 'area_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
    },
    {
      headerName: t('fields.enterTime'),
      field: 'perl_enter_time',
      sortable: true,
      resizable: true,
      cellRenderer: 'DateRenderer',
    },
  ];
};
export default columns;
