import { EQUIPMENT_TYPES } from 'constants/routes';

const columns = (expiryTypes, t, expiryDateMode, siteUseAxleWeightLimit, siteEnabledCOPS) => {
  const expiryColumns = [];

  if (!!expiryColumns) {
    for (let i = 0; i < expiryTypes?.length; i++) {
      if (expiryDateMode === '1') {
        expiryColumns.push({
          headerName: expiryTypes[i].expiry_date_titl,
          field: 'eqpt_exp_d' + (i + 1) + '_dmy',
          sortable: true,
          resizable: true,
          // filter: 'FuzzyFilter',
          cellRenderer: 'LegacyExpDateRenderer',
          suppressSizeToFit: true,
          width: 180,
        });
      } else {
        expiryColumns.push({
          headerName: expiryTypes[i].edt_type_desc,
          field: 'expiry_dates' + (i + 1) + '_eqpt',
          sortable: true,
          resizable: true,
          // filter: 'FuzzyFilter',
          cellRenderer: 'ExpiryDateRenderer',
          suppressSizeToFit: true,
          width: 180,
          cellRendererParams: {
            edt_type_code: expiryTypes[i].edt_type_code,
            edt_time_enabled: expiryTypes[i].edt_time_enabled,
          },
        });
      }
    }
  }

  return [
    {
      headerName: t('fields.id'),
      field: 'eqpt_id',
      sortable: true,
      filter: 'FuzzyFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 100,
      pinned: 'left',
    },
    {
      headerName: t('fields.code'),
      field: 'eqpt_code',
      sortable: true,
      filter: 'FuzzyFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 110,
      pinned: 'left',
    },
    {
      headerName: t('fields.title'),
      field: 'eqpt_title',
      sortable: true,
      filter: 'FuzzyFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 120,
    },
    {
      headerName: t('fields.activeTanker'),
      field: 'eqpt_tanker',
      sortable: true,
      filter: 'MultiFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
    },
    {
      headerName: t('fields.owner'),
      field: 'eqpt_owner_name',
      sortable: true,
      filter: 'MultiFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 160,
    },

    {
      headerName: t('fields.equipmentType'),
      field: 'eqpt_etp_title',
      sortable: true,
      filter: 'MultiFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 160,
      cellRenderer: 'LinkRenderer',
      cellRendererParams: {
        endpoint: EQUIPMENT_TYPES,
        field: 'equipment',
        // index: 'eqpt_etp_title',
        index: 'eqpt_etp',
      },
    },
    ...expiryColumns,
    {
      headerName: t('fields.locked'),
      field: 'eqpt_lock',
      sortable: true,
      filter: 'BooleanFilter',
      cellRenderer: 'LockRenderer',
      resizable: true,
      suppressSizeToFit: true,
      width: 100,
    },
    {
      headerName: t('fields.loadType'),
      field: 'eqpt_load_type_name',
      sortable: true,
      filter: 'MultiFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 130,
    },
    {
      headerName: t('fields.mustTareIn'),
      field: 'eqp_must_tare_in',
      sortable: true,
      filter: 'BooleanFilter',
      cellRenderer: 'BooleanRenderer',
      resizable: true,
      suppressSizeToFit: true,
      width: 130,
    },

    {
      headerName: t('fields.copsGuardMasterUsed'),
      field: 'eqpt_guard_master_used',
      sortable: true,
      filter: 'BooleanFilter',
      cellRenderer: 'BooleanRenderer',
      resizable: true,
      suppressSizeToFit: true,
      width: 160,
      hide: !siteEnabledCOPS,
    },
    {
      headerName: t('fields.copsGuardMasterID'),
      field: 'eqpt_guard_master_id',
      sortable: true,
      filter: 'FuzzyFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 100,
      hide: !siteEnabledCOPS,
    },
    {
      headerName: t('fields.copsGuardMasterDesc'),
      field: 'eqpt_guard_master_desc',
      sortable: true,
      filter: 'FuzzyFilter',
      resizable: true,
      suppressSizeToFit: true,
      width: 200,
      hide: true, //!siteEnabledCOPS,
    },

    {
      headerName: t('fields.lastModified'),
      field: 'eqpt_last_modified',
      cellRenderer: 'DateRenderer',
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      width: 160,
    },
    {
      headerName: t('fields.lastUsed'),
      field: 'eqpt_last_used',
      cellRenderer: 'DateRenderer',
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      width: 160,
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
      hide: true, // !siteUseAxleWeightLimit,
    },
    {
      headerName: t('fields.axleRearWeightLimit') + ' (' + t('units.kg') + ')',
      field: 'etyp_rear_axle',
      filterable: true,
      sortable: true,
      resizable: true,
      width: 180,
      suppressSizeToFit: true,
      hide: true, // !siteUseAxleWeightLimit,
    }, */

    /* {
      headerName: t('fields.axleDetails'),
      field: 'eqpt_axle_details',
      filterable: true,
      sortable: true,
      resizable: true,
      width: 180,
      suppressSizeToFit: true,
      hide: true, // !siteUseAxleWeightLimit,
    },
    {
      headerName: t('fields.axleGroups'),
      field: 'eqpt_axle_briefs',
      filterable: true,
      sortable: true,
      resizable: true,
      width: 180,
      suppressSizeToFit: true,
      hide: true, // !siteUseAxleWeightLimit,
    }, */
    {
      headerName: t('fields.axleGroups'),
      field: 'eqpt_axle_groups',
      filterable: true,
      sortable: true,
      resizable: true,
      width: 240,
      suppressSizeToFit: true,
      hide: !siteUseAxleWeightLimit,
    },
    {
      headerName: t('fields.axleWeightLimits') + ' (' + t('units.kg') + ')',
      field: 'eqpt_axle_weights',
      filterable: true,
      sortable: true,
      resizable: true,
      width: 240,
      suppressSizeToFit: true,
      hide: !siteUseAxleWeightLimit,
    },

    {
      headerName: t('fields.countEqptTanker'),
      field: 'tnkr_count',
      filterable: true,
      sortable: true,
      resizable: true,
      width: 140,
      suppressSizeToFit: true,
      // hide: true,
    },
  ];
};

export default columns;
