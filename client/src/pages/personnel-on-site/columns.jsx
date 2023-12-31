const columns = t => {
  return [
    {
      headerName: t('fields.name'),
      field: 'per_name',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter'
    },
    {
      headerName: t('fields.areaName'),
      field: 'area_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter'
    },
    {
      headerName: t('fields.companyName'),
      field: 'cmpy_name',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter'
    },
    {
      headerName: t('fields.updateTime'),
      field: 'perl_enter_time',
      sortable: true,
      resizable: true,
      cellRenderer: 'DateRenderer'
    }
  ];
};
export default columns;
