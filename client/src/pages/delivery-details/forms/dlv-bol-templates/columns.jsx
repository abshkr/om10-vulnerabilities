const columns = (t, pageState, form) => [
  {
    headerName: `${t('fields.addressAction')}`,
    field: 'ddi_action',
    width: 32,
    //checkboxSelection: true,
    cellRenderer: 'MarkRenderer',
    suppressSizeToFit: true,
    pinned: 'left'
  },
  {
    headerName: t('fields.dbSuppCode'),
    field: 'db_supp_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.dbSuppName'),
    field: 'db_supp_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.dbTripOrdNo'),
    field: 'db_tripord_no',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.dbLdType'),
    field: 'db_ld_type',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.dbLoadTypeName'),
    field: 'db_load_typename',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    hide: true,
    editable: false,
    width: 120,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.dbTemplId'),
    field: 'db_templ_id',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    hide: false,
    editable: false,
    width: 150,
    suppressSizeToFit: true,
  },
];

export default columns;