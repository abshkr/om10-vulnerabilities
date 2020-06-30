const columns = (t) => [
    {
      headerName: t('fields.custAccount'),
      field: 'cust_account',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 180,
      suppressSizeToFit: true,
      pinned: "left",
    },
    {
      headerName: t('fields.custCmpyCode'),
      field: 'cust_cmpy_code',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 180,
    },
    {
      headerName: t('fields.custCmpyName'),
      field: 'cust_cmpy_name',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 220,
    },
    {
      headerName: t('fields.custCmpyFlag'),
      field: 'cust_cmpy_flag',
      filter: 'BooleanFilter',
      sortable: true,
      resizable: true,
      cellRenderer: 'BooleanRenderer',
      width: 80,
    },
    {
      headerName: t('fields.custSuppCode'),
      field: 'cust_supp_code',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 180,
    },
    {
      headerName: t('fields.custSuppName'),
      field: 'cust_supp_name',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 220,
    },
    {
      headerName: t('fields.custSuppFlag'),
      field: 'cust_supp_flag',
      filter: 'BooleanFilter',
      sortable: true,
      resizable: true,
      cellRenderer: 'BooleanRenderer',
      width: 80,
    },
    {
      headerName: t('fields.custAddrCode'),
      field: 'cust_addr_code',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custAddrText'),
      field: 'cust_addr_text',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custAddress'),
      field: 'cust_addr_desc',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.custAllocLockId'),
      field: 'cust_alloc_lockid',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custAllocLockName'),
      field: 'cust_alloc_lockname',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 100,
    },
    {
      headerName: t('fields.custOrderCount'),
      field: 'cust_order_count',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 100,
    },
    {
      headerName: t('fields.custDlocCount'),
      field: 'cust_dloc_count',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      width: 100,
    },

    {
      headerName: t('fields.custContact'),
      field: 'cust_contact',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custPhoneNo'),
      field: 'cust_phone_no',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custCrdLimit'),
      field: 'cust_crd_limit',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custBalance'),
      field: 'cust_balance',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custApprTotal'),
      field: 'cust_appr_total',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custOrdDays'),
      field: 'cust_ord_days',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custCrdDays'),
      field: 'cust_crd_days',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custPriceTypeId'),
      field: 'cust_pricetype_id',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custPriceTypeName'),
      field: 'cust_pricetype_name',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custCtgrCode'),
      field: 'cust_ctgr_code',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custCtgrText'),
      field: 'cust_ctgr_text',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custDelvCode'),
      field: 'cust_delv_code',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custDelvName'),
      field: 'cust_delv_name',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custInvTypeId'),
      field: 'cust_invtype_id',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custInvTypeName'),
      field: 'cust_invtype_name',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custSaleTypeId'),
      field: 'cust_saletype_id',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custSaleTypeName'),
      field: 'cust_saletype_name',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custCrdTerms'),
      field: 'cust_crd_terms',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.custTermsName'),
      field: 'cust_terms_name',
      filter: 'FuzzyFilter',
      sortable: true,
      resizable: true,
      hide: true,
    },
  ];
  

  export default columns;
  