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
    field: 'strap_volume',
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
    field: 'strap_tankcode',
    filter: 'FuzzyFilter',
    sortable: false,
    resizable: true,
    editable: true,
    width: 160,
  },
  {
    headerName: t('fields.terminal'),
    field: 'strap_sitecode',
    filter: 'FuzzyFilter',
    sortable: false,
    resizable: true,
    editable: true,
    width: 160,
  },
];

export default columns;
