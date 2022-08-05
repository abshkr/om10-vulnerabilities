const columns = (t, config) => [
  {
    headerName: t('fields.code'),
    field: 'term_code',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.name'),
    field: 'term_name',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.contact'),
    field: 'term_contact',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
  },

  {
    headerName: t('fields.address'),
    field: 'address_text',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },

  {
    headerName: t('fields.termPidxId'),
    field: 'term_pidx_id',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
    hide: !config?.siteEnabledPIDX,
  },
  {
    headerName: t('fields.termPidxOwner'),
    field: 'term_pidx_owner',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
    hide: !config?.siteEnabledPIDX,
  },
  {
    headerName: t('fields.termPidxLocIdType'),
    field: 'term_pidx_locid_type',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
    hide: !config?.siteEnabledPIDX,
  },
  {
    headerName: t('fields.termPidxLocId'),
    field: 'term_pidx_locid',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
    hide: !config?.siteEnabledPIDX,
  },
];

export default columns;
