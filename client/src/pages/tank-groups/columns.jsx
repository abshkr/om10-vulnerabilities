const columns = (t) => [
  {
    headerName: t('fields.groupName'),
    field: 'tgr_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.numberOfTanks'),
    field: 'tgr_tankcount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.listOfTanks'),
    field: 'tgr_tanklist',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.activeTank'),
    field: 'tgr_tankcode',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.groupBaseCode'),
    field: 'tgr_basecode',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.groupBaseProduct'),
    field: 'tgr_basename',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.terminalCode'),
    field: 'tgr_sitecode',
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
