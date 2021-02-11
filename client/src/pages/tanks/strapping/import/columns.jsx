import _ from 'lodash';

const columns = (t, strap_types) => [
  {
    headerName: `${t('fields.tankLevel')} (${t('units.mm')})`,
    field: 'strap_height',
    filter: 'FuzzyFilter',
    sortable: false,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 100,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      ranges: {
        max: 999999999,
        min: 0,
      },
      t,
    },
  },
  {
    headerName: `${t('fields.observedVolume')} (${t('units.litres')})`,
    field: 'strap_volume',
    filter: 'FuzzyFilter',
    sortable: false,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 120,
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      ranges: {
        max: 999999999,
        min: 0,
      },
      t,
    },
  },
  {
    headerName: t('fields.tank'),
    field: 'strap_tankcode',
    filter: 'FuzzyFilter',
    sortable: false,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 160,
  },
  {
    headerName: t('fields.terminal'),
    field: 'strap_sitecode',
    filter: 'FuzzyFilter',
    sortable: false,
    resizable: true,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 160,
  },

  {
    headerName: t('fields.strapType'),
    field: 'strap_type',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    hide: false,
    editable: true,
    cellClass: 'editable-ag-grid-cell',
    width: 130,
    cellRenderer: 'ListRenderer',
    cellRendererParams: {
      values: _.uniq(
        _.map(strap_types?.records, (item) => {
          // return { code: _.toNumber(item.strap_type_id), name: item.strap_type_name };
          return { code: item.strap_type_id, name: item.strap_type_name };
        })
      ),
    },
    cellEditor: 'ListEditor',
    cellEditorParams: {
      values: _.uniq(
        _.map(strap_types?.records, (item) => {
          // return { code: _.toNumber(item.strap_type_id), name: item.strap_type_name };
          return { code: item.strap_type_id, name: item.strap_type_name };
        })
      ),
    },
  },
];

export default columns;
