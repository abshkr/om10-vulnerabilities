const columns = t => [
  {
    headerName: t('fields.product'),
    field: 'mtd_type_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.tankCode'),
    field: 'mtd_address',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.productClass'),
    field: 'mtd_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.density'),
    field: 'src_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.temperature'),
    field: 'mtd_src_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.observedQuantity'),
    field: 'dst_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.standardQuantity'),
    field: 'mtd_dst_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.massQuantity'),
    field: 'mtd_dst_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  }
];

export default columns;
