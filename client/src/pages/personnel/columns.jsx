const columns = t => {
  return [
    {
      headerName: t('fields.code'),
      field: 'per_code',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true
    },
    {
      headerName: t('fields.name'),
      field: 'per_name',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true
    },
    {
      headerName: t('fields.employerCode'),
      field: 'cmpy_code',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter'
    },
    {
      headerName: t('fields.employer'),
      field: 'cmpy_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter'
    },
    {
      headerName: t('fields.role'),
      field: 'role_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter'
    },
    {
      headerName: t('fields.licenceNumber'),
      field: 'per_licence_no',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter'
    },
    {
      headerName: t('fields.areaAccess'),
      field: 'per_lock',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter'
    },
    {
      headerName: t('fields.status'),
      field: 'urer_status_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter'
    },
    {
      headerName: t('fields.department'),
      field: 'per_department',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter'
    },
    {
      headerName: t('fields.email'),
      field: 'per_email',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter'
    },
    {
      headerName: t('fields.lastModified'),
      field: 'per_last_modified',
      sortable: true,
      resizable: true,
      cellRenderer: 'DateRenderer'
    },
    {
      headerName: t('fields.lastUsed'),
      field: 'per_last_dmy',
      sortable: true,
      resizable: true,
      cellRenderer: 'DateRenderer'
    }
  ];
};
export default columns;
