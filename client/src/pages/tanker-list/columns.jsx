const columns = (expiryTypes, t) => {
  const expiryColumns = [];

  if (!!expiryColumns) {
    for (let i = 0; i < expiryTypes?.length; i++) {
      expiryColumns.push({
        headerName: expiryTypes[i].edt_type_desc,
        field: "expiry_dates",
        sortable: true,
        resizable: true,
        filter: 'FuzzyFilter',
        cellRenderer: 'ExpiryDateRenderer',
        suppressSizeToFit: true,
        width: 180,
        cellRendererParams: {
          edt_type_code: expiryTypes[i].edt_type_code,
        }
      });
    }
  }
  
  return [
    {
      headerName: t('fields.code'),
      field: 'tnkr_code',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter',
      suppressSizeToFit: true,
      width: 110,
      pinned: "left",
    },
    {
      headerName: t('fields.name'),
      field: 'tnkr_name',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter',
      suppressSizeToFit: true,
      width: 120,
      pinned: "left",
    },
    {
      headerName: t('fields.carrier'),
      field: 'tnkr_carrier_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      suppressSizeToFit: true,
      width: 180,
    },
    {
      headerName: t('fields.owner'),
      field: 'tnkr_owner_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      suppressSizeToFit: true,
      width: 180,
    },
    {
      headerName: t('fields.equipmentType'),
      field: 'tnkr_eqpt_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      suppressSizeToFit: true,
      width: 160,
    },
    {
      headerName: t('fields.baseDepot'),
      field: 'tnkr_base_site_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      suppressSizeToFit: true,
      width: 140,
    },
    {
      headerName: t('fields.locked'),
      field: 'tnkr_lock',
      sortable: true,
      resizable: true,
      cellRenderer: 'LockRenderer',
      filter: 'BooleanFilter',
      suppressSizeToFit: true,
      width: 110,
    },
    {
      headerName: t('fields.active'),
      field: 'tnkr_active',
      sortable: true,
      resizable: true,
      cellRenderer: 'BooleanRenderer',
      filter: 'BooleanFilter',
      suppressSizeToFit: true,
      width: 110,
    },
    {
      headerName: t('fields.bayCheck'),
      field: 'tnkr_bay_loop_ch',
      sortable: true,
      resizable: true,
      cellRenderer: 'BooleanRenderer',
      filter: 'BooleanFilter',
      suppressSizeToFit: true,
      width: 120,
    },
    {
      headerName: t('fields.archived'),
      field: 'tnkr_archive',
      sortable: true,
      resizable: true,
      cellRenderer: 'BooleanRenderer',
      filter: 'BooleanFilter',
      suppressSizeToFit: true,
      width: 120,
    },
    ...expiryColumns,
    {
      headerName: t('fields.lastModified'),
      field: 'tnkr_last_modified',
      sortable: true,
      resizable: true,
      cellRenderer: 'DateRenderer',
      suppressSizeToFit: true,
      width: 160,
    },
    {
      headerName: t('fields.lastUsed'),
      field: 'tnkr_last_used',
      sortable: true,
      resizable: true,
      cellRenderer: 'DateRenderer',
      suppressSizeToFit: true,
      width: 160,
    },
  ]
};

export default columns;
