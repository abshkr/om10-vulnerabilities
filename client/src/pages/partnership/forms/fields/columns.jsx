const columns = (t, value) => [
  {
    headerName: "",
    field: 'selected',
    suppressSizeToFit: true, 
    checkboxSelection: true,
    headerCheckboxSelection: true,
    cellRenderer: (params) => {
        params.node.setSelected(params.data.selected === 'Y');
    },
    width: 40,
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
    width: 150,
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
];

export default columns;
