const columns = t => [
  {
    headerName: t('fields.type'),
    field: 'mtd_type_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.address'),
    field: 'mtd_address',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.code'),
    field: 'mtd_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.sourceType'),
    field: 'src_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.sourceUnit'),
    field: 'mtd_src_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.receivingType'),
    field: 'dst_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.receivingUnit'),
    field: 'mtd_dst_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.ambient'),
    field: 'mtd_amb',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.corrected'),
    field: 'mtd_cor',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.pollInterval'),
    field: 'mtd_poll',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  }
];

export default columns;
