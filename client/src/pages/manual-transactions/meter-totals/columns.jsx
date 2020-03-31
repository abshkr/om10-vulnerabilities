const columns = t => [
  {
    headerName: t('fields.meter'),
    field: 'mtd_type_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.type'),
    field: 'mtd_address',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.openingAmbient'),
    field: 'mtd_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.closingAmbient'),
    field: 'src_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.openingCorrected'),
    field: 'mtd_src_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.closingCorrected'),
    field: 'dst_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.openingMass'),
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
    field: 'mtd_poll',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  }
];

export default columns;
