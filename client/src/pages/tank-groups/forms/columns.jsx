const columns = (t) => [
  {
    headerName: t('fields.tankCode'),
    field: 'tgr_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.tankBaseName'),
    field: 'tgr_tankcount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.tankBaseProduct'),
    field: 'tgr_tanklist',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.isActivated'),
    field: 'tgr_tankcode',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.tankGroup'),
    field: 'tgr_basecode',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.terminalCode'),
    field: 'tgr_basename',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.terminalName'),
    field: 'tgr_sitename',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
];

export default columns;
