const columns = t => [
  {
    headerName: t('fields.deliverNumber'),
    field: 'mtd_type_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.equipmentId'),
    field: 'mtd_address',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.compartmentNumber'),
    field: 'mtd_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.drawerCode'),
    field: 'src_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.drawerProduct'),
    field: 'mtd_src_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.bayArm'),
    field: 'dst_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.density'),
    field: 'mtd_dst_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.temperature'),
    field: 'mtd_amb',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.observedQuantity'),
    field: 'mtd_cor',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.standardQuantity'),
    field: 'mtd_poll',
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
