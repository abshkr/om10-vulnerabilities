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
          sequence: i
        }
      });
    }
  }
  
  return [
    {
      headerName: t('fields.id'),
      field: 'eqpt_id',
      sortable: true,
      filter: 'FuzzyFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 100,
      pinned: "left",
    },
    {
      headerName: t('fields.code'),
      field: 'eqpt_code',
      sortable: true,
      filter: 'FuzzyFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 110,
      pinned: "left",
    },
    {
      headerName: t('fields.title'),
      field: 'eqpt_title',
      sortable: true,
      filter: 'FuzzyFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 120,
    },
    {
      headerName: t('fields.activeTanker'),
      field: 'eqpt_tanker',
      sortable: true,
      filter: 'MultiFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
    },
    {
      headerName: t('fields.owner'),
      field: 'eqpt_owner_name',
      sortable: true,
      filter: 'MultiFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 160,
    },

    {
      headerName: t('fields.equipmentType'),
      field: 'eqpt_etp_title',
      sortable: true,
      filter: 'MultiFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 160,
    },
    ...expiryColumns,
    {
      headerName: t('fields.locked'),
      field: 'eqpt_lock',
      sortable: true,
      filter: 'BooleanFilter',
      cellRenderer: 'LockRenderer',
      resizable: true,
      suppressSizeToFit: true,
      width: 100,
    },
    {
      headerName: t('fields.loadType'),
      field: 'eqpt_load_type_name',
      sortable: true,
      filter: 'MultiFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 130,
    },
    {
      headerName: t('fields.mustTareIn'),
      field: 'eqp_must_tare_in',
      sortable: true,
      filter: 'BooleanFilter',
      cellRenderer: 'BooleanRenderer',
      resizable: true,
      suppressSizeToFit: true,
      width: 130,
    },
    {
      headerName: t('fields.lastModified'),
      field: 'eqpt_last_modified',
      cellRenderer: 'DateRenderer',
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      width: 160,
    },
    {
      headerName: t('fields.lastUsed'),
      field: 'eqpt_last_used',
      cellRenderer: 'DateRenderer',
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      width: 160,
    }
  ];
}

export default columns;
