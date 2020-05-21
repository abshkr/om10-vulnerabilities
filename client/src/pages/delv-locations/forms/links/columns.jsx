const columns = (t) => [
    {
      headerName: t('fields.delvCustAcct'),
      field: 'cust_acnt',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.delvCustAcctDesc'),
      field: 'cust_desc',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.delvCustCmpyCode'),
      field: 'cust_cmpy_code',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.delvCustCmpyName'),
      field: 'cust_cmpy_name',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.delvCustSuppCode'),
      field: 'cust_supp_code',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.delvCustSuppName'),
      field: 'cust_supp_name',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.delvCustCatgCode'),
      field: 'cust_ctgr_code',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.delvCustCatgText'),
      field: 'cust_ctgr_text',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
    },
  ];
  

  export default columns;
  