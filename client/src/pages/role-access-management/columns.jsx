const columns = t => [
  {
    headerName: t('fields.roleId'),
    field: 'role_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.roleName'),
    field: 'auth_level_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.comments'),
    field: 'role_note',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  }
];

export default columns;
