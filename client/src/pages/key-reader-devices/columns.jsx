const columns = (t) => {
  return [
    {
      headerName: t('fields.code'),
      field: 'adv_code',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.class'),
      field: 'dev_type',
      filter: 'MultiFilter',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.type'),
      field: 'krdc_type',
      filter: 'MultiFilter',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.use'),
      field: 'krdc_use',
      filter: 'MultiFilter',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.area'),
      field: 'area_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
    },
  ];
};
export default columns;
