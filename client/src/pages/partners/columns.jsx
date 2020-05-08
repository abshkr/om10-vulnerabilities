const columns = (t) => [
  {
    headerName: t('fields.partnerId'),
    field: 'prtnr_seq',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.companyCode'),
    field: 'prtnr_cmpy',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.companyName'),
    field: 'prtnr_cmpy_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.partnerCode'),
    field: 'prtnr_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.partnerName'),
    field: 'prtnr_name1',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },

  {
    headerName: `${t('fields.partnerName')}`,
    field: 'prtnr_name2',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.partnerName')} 2`,
    field: 'prtnr_name3',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.partnerName')} 3`,
    field: 'prtnr_name4',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.partnerName')} 4`,
    field: 'prtnr_name5',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.partnerName')} 5`,
    field: 'prtnr_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.partnerTypeCode'),
    field: 'prtnr_type_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.partnerType'),
    field: 'prtnr_addr',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.partnerAddressCode'),
    field: 'prtnr_addr_text',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },

  {
    headerName: t('fields.partnerAddress'),
    field: 'prtnr_desc',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
  },
];

export default columns;
