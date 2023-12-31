const columns = (expiryTypes, t, expiryDateMode) => {
  const expiryColumns = [];

  if (!!expiryColumns) {
    for (let i = 0; i < expiryTypes?.length; i++) {
      if (expiryDateMode === '1') {
        expiryColumns.push({
          headerName: expiryTypes[i].expiry_date_titl,
          field: 'per_exp_d' + (i + 1) + '_dmy',
          sortable: true,
          resizable: true,
          // filter: 'FuzzyFilter',
          cellRenderer: 'LegacyExpDateRenderer',
          suppressSizeToFit: true,
          width: 180,
        });
      } else {
        expiryColumns.push({
          headerName: expiryTypes[i].edt_type_desc,
          field: 'expiry_dates' + (i + 1) + '_psnl',
          sortable: true,
          resizable: true,
          // filter: 'FuzzyFilter',
          cellRenderer: 'ExpiryDateRenderer',
          suppressSizeToFit: true,
          width: 180,
          cellRendererParams: {
            edt_type_code: expiryTypes[i].edt_type_code,
            edt_time_enabled: expiryTypes[i].edt_time_enabled,
          },
        });
      }
    }
  }

  return [
    {
      headerName: t('fields.code'),
      field: 'per_code',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      width: 110,
      pinned: 'left',
    },
    {
      headerName: t('fields.name'),
      field: 'per_name',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      width: 140,
      pinned: 'left',
    },
    {
      headerName: t('fields.employerCode'),
      field: 'cmpy_code',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter',
      suppressSizeToFit: true,
      width: 150,
    },
    {
      headerName: t('fields.employer'),
      field: 'cmpy_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      suppressSizeToFit: true,
      width: 160,
    },
    {
      headerName: t('fields.role'),
      field: 'per_auth_role',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      suppressSizeToFit: true,
      width: 120,
    },
    {
      headerName: t('fields.licenceNumber'),
      field: 'per_licence_no',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter',
      suppressSizeToFit: true,
      width: 140,
    },
    ...expiryColumns,
    {
      headerName: t('fields.areaAccess'),
      field: 'per_lock',
      sortable: true,
      resizable: true,
      filter: 'BooleanFilter',
      cellRenderer: 'LockRenderer',
      suppressSizeToFit: true,
      width: 130,
    },
    {
      headerName: t('fields.statusId'),
      field: 'user_status_flag',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      suppressSizeToFit: true,
      width: 110,
      hide: true,
    },
    {
      headerName: t('fields.status'),
      field: 'urer_status_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      suppressSizeToFit: true,
      width: 110,
    },
    {
      headerName: t('fields.department'),
      field: 'per_department',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter',
      suppressSizeToFit: true,
      width: 140,
    },
    {
      headerName: t('fields.email'),
      field: 'per_email',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter',
      suppressSizeToFit: true,
      width: 140,
    },
    {
      headerName: t('fields.phone'),
      field: 'per_phone',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter',
      suppressSizeToFit: true,
      width: 140,
    },
    {
      headerName: t('fields.lastModified'),
      field: 'per_last_modified',
      sortable: true,
      resizable: true,
      cellRenderer: 'DateRenderer',
      suppressSizeToFit: true,
      width: 160,
    },
    {
      headerName: t('fields.lastUsed'),
      field: 'per_last_dmy',
      sortable: true,
      resizable: true,
      cellRenderer: 'DateRenderer',
      suppressSizeToFit: true,
      width: 160,
    },
  ];
};
export default columns;
