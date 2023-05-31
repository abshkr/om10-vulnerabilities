const columns = (t) => [
  {
    headerName: t('fields.fieldCode'),
    field: 'field_code',
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
    cellRenderer: 'TitleRender',
    // pinned: 'left',
  },
  {
    headerName: t('fields.fieldSource'),
    field: 'field_source',
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.fieldTarget'),
    field: 'field_target',
    resizable: true,
    width: 200,
    suppressSizeToFit: true,
  },
];

export default columns;
