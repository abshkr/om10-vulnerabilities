const columns = (t) => [
  {
    headerName: `${t('fields.tankLevel')} (${t('units.mm')})`,
    field: 'strap_height',
    filter: 'FuzzyFilter',
    sortable: false,
    resizable: true,
    editable: true,
    width: 100,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      ranges: {
        max: 999999999,
        min: 0,
      },
    },
  },
  {
    headerName: `${t('fields.observedVolume')} (${t('units.litres')})`,
    field: 'strap_vol',
    filter: 'FuzzyFilter',
    sortable: false,
    resizable: true,
    editable: true,
    width: 120,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      ranges: {
        max: 999999999,
        min: 0,
      },
    },
  },
  {
    headerName: t('fields.tank'),
    field: 'str_tk_tankcode',
    filter: 'FuzzyFilter',
    sortable: false,
    resizable: true,
    editable: true,
    width: 160,
  },
  {
    headerName: t('fields.terminal'),
    field: 'str_tk_tankdepo',
    filter: 'FuzzyFilter',
    sortable: false,
    resizable: true,
    editable: true,
    width: 160,
  },
];

export default columns;
