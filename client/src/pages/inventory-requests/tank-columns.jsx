const columns = (t) => {
  return [
    {
      headerName: t('fields.tank'),
      field: 'tank_code',
      filter: 'MultiFilter',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.inventoryRequired'),
      field: 'tank_inv_needed',
      filter: 'BooleanFilter',
      sortable: true,
      resizable: true,
      cellRenderer: 'NullRenderer',
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
