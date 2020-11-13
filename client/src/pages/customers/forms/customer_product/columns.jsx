const columns = (t) => [
  {
    headerName: "",
    field: 'selected',
    suppressSizeToFit: true, 
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 40,
  },
  {
    headerName: t('fields.custSuppCode'),
    field: 'supplier_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 130,
  },
  {
    headerName: t('fields.custSuppName'),
    field: 'supplier_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // width: 220,
  },
  {
    headerName: t('fields.prodCode'),
    field: 'prod_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // cellRenderer: 'BooleanRenderer',
    width: 120,
  },
  {
    headerName: t('fields.prodName'),
    field: 'prod_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // hide: true,
  },
];
  
export default columns;
  