const columns = (t) => {
  return [
    {
      headerName: t('fields.tankCode'),
      field: 'tank_code',
      filter: 'MultiFilter',
      sortable: true,
      resizable: true,
      checkboxSelection: true,
      // headerCheckboxSelection: true,
    },
    {
      headerName: t('fields.tankName'),
      field: 'tank_name',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      // width: 120,
      // suppressSizeToFit: true,
    },
    {
      headerName: t('fields.depot'),
      field: 'tank_terminal',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      hide: true,
    },
    {
      headerName: t('fields.depot'),
      field: 'tank_termname',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
    },
    {
      headerName: t('fields.gaugingMethod'),
      field: 'tank_gaugingmthd_desc',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: t('fields.inventoryRequired'),
      field: 'tank_inv_needed',
      filter: 'BooleanFilter',
      sortable: true,
      resizable: true,
      cellRenderer: 'BooleanRenderer',
      suppressSizeToFit: true,
    },
    {
      headerName: t('fields.adhoc'),
      field: 'tank_adhoc_ivrq',
      sortable: true,
      resizable: true,
      filter: 'BooleanFilter',
      cellRenderer: 'BooleanRenderer',
      suppressSizeToFit: true,
    },
  ];
};
export default columns;
