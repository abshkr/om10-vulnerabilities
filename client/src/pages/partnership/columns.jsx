const columns = (t) => [
  {
    headerName: t('fields.companyCode'),
    field: 'partner_cmpy_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 140,
    pinned: 'left',
  },
  {
    headerName: t('fields.companyName'),
    field: 'partner_cmpy_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 150,
    pinned: 'left',
  },
  {
    headerName: t('fields.customerAccount'),
    field: 'partner_cust_acct',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 160,
  },
  {
    headerName: t('fields.customerName'),
    field: 'partner_cust_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 150,
  },
  {
    headerName: t('fields.partnerId'),
    field: 'partner_seq',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 100,
  },
  {
    headerName: t('fields.partnerCode'),
    field: 'partner_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 130,
  },
  {
    headerName: `${t('fields.partnerName')} 1`,
    field: 'prtnr_name1',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 140,
  },
  {
    headerName: `${t('fields.partnerName')} 2`,
    field: 'prtnr_name2',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 140,
  },
  {
    headerName: `${t('fields.partnerName')} 3`,
    field: 'prtnr_name3',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 140,
  },
  {
    headerName: `${t('fields.partnerName')} 4`,
    field: 'prtnr_name4',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 140,
  },
  {
    headerName: `${t('fields.partnerName')} 5`,
    field: 'prtnr_name5',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 140,
  },
  {
    headerName: t('fields.partnerTypeCode'),
    field: 'prtnr_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 160,
  },
  {
    headerName: t('fields.partnerType'),
    field: 'prtnr_type_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 140,
  },

  {
    headerName: t('fields.partnerAddressCode'),
    field: 'prtnr_addr',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 180,
  },

  {
    headerName: t('fields.partnerAddress'),
    field: 'prtnr_addr_text',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true, 
    width: 140,
  },
];

export default columns;
