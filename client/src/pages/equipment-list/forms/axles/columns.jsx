import _ from 'lodash';

const columns = (t, selected, axleGroups, offsets, offsetType) => [
  {
    headerName: t('fields.id'),
    field: 'axle_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    // width: 60,
  },
  {
    headerName: t('fields.axleLimitTypeId'),
    field: 'limit_type_id',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.axleLimitTypeCode'),
    field: 'limit_type_code',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.axleLimitType'),
    field: 'limit_type_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.axleGroup'),
    field: 'axle_group',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    suppressSizeToFit: true,
    // hide: true,
    editable: selected?.[0]?.editable,
    cellClass: selected?.[0]?.editable ? 'selected-editable-ag-grid-cell' : '',
    cellRenderer: 'ListRenderer',
    cellRendererParams: {
      values: _.uniq(
        _.map(axleGroups?.records, (item) => {
          return { code: _.toNumber(item.axle_group_id), name: item.axle_group_name };
        })
      ),
    },
    cellEditor: 'ListEditor',
    cellEditorParams: {
      values: _.uniq(
        _.map(axleGroups?.records, (item) => {
          return { code: _.toNumber(item.axle_group_id), name: item.axle_group_name };
        })
      ),
    },
  },
  {
    headerName: t('fields.axleGroup'),
    field: 'axle_group_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.axleWeightLimit') + ' (' + t('units.kg') + ')',
    field: 'axle_weight_limit',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.axleWeightLimit') + ' (' + t('units.kg') + ')',
    field: 'user_weight_limit',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
    editable: selected?.[0]?.editable,
    cellClass: 'editable-ag-grid-cell',
    cellEditor: 'NumericEditor',
    cellEditorParams: {
      ranges: {
        max: 22500,
        min: 5000,
      },
      t,
    },
    // width: 150,
  },
  {
    headerName: offsetType !== 1 ? '' : t('fields.axleWeightLimitNote') + ' (' + t('units.kg') + ')',
    field: 'user_weight_offset',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    suppressSizeToFit: true,
    hide: !_.find(offsets, (item) => item !== 0),
    cellRenderer: 'OffsetAlarmRenderer',
    cellRendererParams: {
      color: '#C80000',
      fieldOrigin: 'axle_weight_limit',
      fieldCustom: 'user_weight_limit',
      note: t('fields.axleWeightLimitNote'),
      unit: t('units.kg'),
      type: offsetType,
    },
    width: 280,
  },
];

export default columns;
