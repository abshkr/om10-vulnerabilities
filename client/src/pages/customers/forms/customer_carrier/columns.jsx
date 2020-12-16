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
    headerName: t('fields.carrierCode'),
    field: 'cmpy_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 130,
  },
  {
    headerName: t('fields.carrierName'),
    field: 'cmpy_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    // width: 220,
  },
];
  
export default columns;
  