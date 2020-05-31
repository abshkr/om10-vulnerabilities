const columns = t => [
  {
    headerName: t('fields.material'),
    field: 'material',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.adrDesc'),
    field: 'adr_desc1',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.adrDesc2'),
    field: 'adr_desc2',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.adrDesc3'),
    field: 'adr_desc3',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.adrName'),
    field: 'adr_name',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.adrType'),
    field: 'adr_type',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.adrFareklasse'),
    field: 'adr_fareklasse',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.protectFreeze'),
    field: 'protect_freeze',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.certificOfAnalysis'),
    field: 'certific_of_analysis',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.additionalTxt'),
    field: 'additional_txt',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.placardNotation1'),
    field: 'placard_notation1',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.placardNotation2'),
    field: 'placard_notation2',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.placardNotation3'),
    field: 'placard_notation3',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.placardNotation4'),
    field: 'placard_notation4',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
  {
    headerName: t('fields.stccCode'),
    field: 'stcc_code',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true
  },
];

export default columns;
