const columns = (t, config) => [
  {
    headerName: t('fields.id'),
    field: 'etyp_id',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 60,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.equipmentTypeCode'),
    field: 'etyp_title',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    width: 220,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.compartments'),
    field: 'cmptnu',
    filterable: true,
    sortable: true,
    resizable: true,
    width: 140,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.preview'),
    field: 'image',
    sortable: true,
    resizable: true,
    cellRenderer: 'EquipmentRenderer',
    width: 500,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.schedulable'),
    field: 'etyp_schedul',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
    width: 150,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.rigid'),
    field: 'etyp_isrigid',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
    width: 100,
    suppressSizeToFit: true,
  },
  {
    headerName: t('fields.axleFrontWeightLimit') + ' (' + t('units.kg') + ')',
    field: 'front_weigh_limit',
    filterable: true,
    sortable: true,
    resizable: true,
    width: 140,
    suppressSizeToFit: true,
    hide: true,
  },
  {
    headerName: t('fields.axleRearWeightLimit') + ' (' + t('units.kg') + ')',
    field: 'rear_weigh_limit',
    filterable: true,
    sortable: true,
    resizable: true,
    width: 140,
    suppressSizeToFit: true,
    hide: true,
  },
  /* {
    headerName: t('fields.axleFrontWeightLimit') + ' (' + t('units.kg') + ')',
    field: 'etyp_front_axle',
    filterable: true,
    sortable: true,
    resizable: true,
    width: 180,
    suppressSizeToFit: true,
    hide: true, // !config?.siteUseAxleWeightLimit,
  },
  {
    headerName: t('fields.axleRearWeightLimit') + ' (' + t('units.kg') + ')',
    field: 'etyp_rear_axle',
    filterable: true,
    sortable: true,
    resizable: true,
    width: 180,
    suppressSizeToFit: true,
    hide: true, // !config?.siteUseAxleWeightLimit,
  }, */

  {
    headerName: t('fields.countEtypEquipment'),
    field: 'eqpt_count',
    filterable: true,
    sortable: true,
    resizable: true,
    width: 160,
    suppressSizeToFit: true,
    // hide: true,
  },
  {
    headerName: t('fields.countEtypTanker'),
    field: 'tnkr_count',
    filterable: true,
    sortable: true,
    resizable: true,
    width: 160,
    suppressSizeToFit: true,
    // hide: true,
  },
  {
    headerName: t('fields.countEtypEquiptype'),
    field: 'etyp_count',
    filterable: true,
    sortable: true,
    resizable: true,
    width: 160,
    suppressSizeToFit: true,
    hide: true,
  },
];

export default columns;
