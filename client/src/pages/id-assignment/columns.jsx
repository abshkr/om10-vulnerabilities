const columns = t => [
  {
    headerName: t('fields.assignmentNo'),
    field: 'kya_key_no',
    sortable: true,
    filter: 'FuzzyFilter',
    resizable: true,
    suppressSizeToFit: true, 
    width: 140,
    pinned: "left",
  },
  {
    headerName: t('fields.issuer'),
    field: 'kya_issuer_name',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true,
    suppressSizeToFit: true, 
    width: 110,
  },
  {
    headerName: t('fields.assignmentType'),
    field: 'kya_type_name',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true,
    suppressSizeToFit: true, 
    width: 150,
  },
  {
    headerName: t('fields.physicalType'),
    field: 'kya_phys_name',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true,
    suppressSizeToFit: true, 
    width: 150,
  },
  {
    headerName: t('fields.timeCode'),
    field: 'kya_timecode',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true,
    suppressSizeToFit: true, 
    width: 110,
  },
  {
    headerName: t('fields.locked'),
    field: 'kya_lock',
    sortable: true,
    filter: 'BooleanFilter',
    cellRenderer: 'LockRenderer',
    resizable: true,
    suppressSizeToFit: true, 
    width: 100,
  },
  {
    headerName: t('fields.adhoc'),
    field: 'kya_adhoc',
    sortable: true,
    filter: 'BooleanFilter',
    cellRenderer: 'LockRenderer',
    resizable: true,
    suppressSizeToFit: true, 
    width: 100,
  },
  {
    headerName: t('fields.physicalTagText'),
    field: 'kya_txt',
    sortable: true,
    filter: 'FuzzySearch',
    resizable: true,
    suppressSizeToFit: true, 
    width: 160,
  },
  {
    headerName: t('fields.personnelCode'),
    field: 'kya_personnel',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true,
    suppressSizeToFit: true, 
    width: 140,
  },
  {
    headerName: t('fields.personnel'),
    field: 'kya_psnl_name',
    sortable: true,
    filter: 'MultiFilter',
    resizable: true,
    suppressSizeToFit: true, 
    width: 110,
  },
  {
    headerName: t('fields.role'),
    field: 'kya_role_name',
    sortable: true,
    filter: 'BooleanFilter',
    resizable: true,
    suppressSizeToFit: true, 
    width: 100,
  },
  {
    headerName: t('fields.drawer'),
    field: 'kya_draw_name',
    sortable: true,
    filter: 'BooleanFilter',
    resizable: true,
    suppressSizeToFit: true, 
    width: 110,
  },
  {
    headerName: t('fields.supplier'),
    field: 'kya_issuer_name',
    sortable: true,
    filter: 'BooleanFilter',
    resizable: true,
    suppressSizeToFit: true, 
    width: 110,
  },
  {
    headerName: t('fields.tankerCode'),
    field: 'kya_tanker',
    sortable: true,
    filter: 'BooleanFilter',
    resizable: true,
    suppressSizeToFit: true, 
    width: 140,
  },
  {
    headerName: t('fields.tanker'),
    field: 'kya_tnkr_name',
    sortable: true,
    filter: 'BooleanFilter',
    resizable: true,
    suppressSizeToFit: true, 
    width: 140,
  },
  {
    headerName: t('fields.equipment'),
    field: 'kya_eqpt_name',
    sortable: true,
    filter: 'BooleanFilter',
    resizable: true,
    suppressSizeToFit: true, 
    width: 140,
  },
];

export default columns;
