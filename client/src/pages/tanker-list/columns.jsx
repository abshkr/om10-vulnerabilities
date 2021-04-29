import { EQUIPMENT_TYPES, EQUIPMENT_LIST } from 'constants/routes';

const columns = (expiryTypes, t, expiryDateMode, siteUseAxleWeightLimit, carrcode_tankernum_tag) => {
  const expiryColumns = [];

  if (expiryDateMode === '1') {
    expiryColumns.push({
      headerName: expiryTypes ? expiryTypes[0]?.expiry_date_titl : '',
      field: 'tnkr_lic_exp',
      sortable: true,
      resizable: true,
      // filter: 'FuzzyFilter',
      cellRenderer: 'DateRenderer',
      suppressSizeToFit: true,
      width: 180,
    });
    expiryColumns.push({
      headerName: expiryTypes ? expiryTypes[1]?.expiry_date_titl : '',
      field: 'tnkr_dglic_exp',
      sortable: true,
      resizable: true,
      // filter: 'FuzzyFilter',
      cellRenderer: 'DateRenderer',
      suppressSizeToFit: true,
      width: 180,
    });
    expiryColumns.push({
      headerName: expiryTypes ? expiryTypes[2]?.expiry_date_titl : '',
      field: 'tnkr_ins_exp',
      sortable: true,
      resizable: true,
      // filter: 'FuzzyFilter',
      cellRenderer: 'DateRenderer',
      suppressSizeToFit: true,
      width: 180,
    });
  } else {
    if (!!expiryColumns) {
      for (let i = 0; i < expiryTypes?.length; i++) {
        expiryColumns.push({
          headerName: expiryTypes[i].edt_type_desc,
          field: 'expiry_dates',
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
      headerName: t('fields.code'),
      field: 'tnkr_code',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter',
      suppressSizeToFit: true,
      width: 110,
      pinned: 'left',
    },
    {
      headerName: t('fields.name'),
      field: 'tnkr_name',
      sortable: true,
      resizable: true,
      filter: 'FuzzyFilter',
      suppressSizeToFit: true,
      width: 120,
      pinned: 'left',
    },
    {
      headerName: t('fields.number'),
      field: 'tnkr_number',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      suppressSizeToFit: true,
      hide: !carrcode_tankernum_tag,
      width: 110,
    },
    {
      headerName: t('fields.schdCarrier'),
      field: 'tnkr_carrier_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      suppressSizeToFit: true,
      width: 180,
    },
    {
      headerName: t('fields.owner'),
      field: 'tnkr_owner_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      suppressSizeToFit: true,
      width: 180,
    },

    {
      headerName: t('fields.equipmentId'),
      field: 'tnkr_etp',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      suppressSizeToFit: true,
      width: 160,
      cellRenderer: 'LinkRenderer',
      cellRendererParams: {
        endpoint: EQUIPMENT_LIST,
        field: 'equipment',
        index: 'tnkr_etp',
      },
    },

    {
      headerName: t('fields.equipmentType'),
      field: 'tnkr_eqpt_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      suppressSizeToFit: true,
      width: 160,
      cellRenderer: 'LinkRenderer',
      cellRendererParams: {
        endpoint: EQUIPMENT_TYPES,
        field: 'equipment',
        // index: 'tnkr_eqpt_name',
        index: 'tnkr_etp',
      },
    },
    {
      headerName: t('fields.baseDepot'),
      field: 'tnkr_base_site_name',
      sortable: true,
      resizable: true,
      filter: 'MultiFilter',
      suppressSizeToFit: true,
      width: 140,
    },
    {
      headerName: t('fields.locked'),
      field: 'tnkr_lock',
      sortable: true,
      resizable: true,
      cellRenderer: 'LockRenderer',
      filter: 'BooleanFilter',
      suppressSizeToFit: true,
      width: 110,
    },
    {
      headerName: t('fields.active'),
      field: 'tnkr_active',
      sortable: true,
      resizable: true,
      cellRenderer: 'BooleanRenderer',
      filter: 'BooleanFilter',
      suppressSizeToFit: true,
      width: 110,
    },
    {
      headerName: t('fields.bayCheck'),
      field: 'tnkr_bay_loop_ch',
      sortable: true,
      resizable: true,
      cellRenderer: 'BooleanRenderer',
      filter: 'BooleanFilter',
      suppressSizeToFit: true,
      width: 120,
    },
    {
      headerName: t('fields.archived'),
      field: 'tnkr_archive',
      sortable: true,
      resizable: true,
      cellRenderer: 'BooleanRenderer',
      filter: 'BooleanFilter',
      suppressSizeToFit: true,
      width: 120,
    },
    ...expiryColumns,
    {
      headerName: t('fields.lastModified'),
      field: 'tnkr_last_modified',
      sortable: true,
      resizable: true,
      cellRenderer: 'DateRenderer',
      suppressSizeToFit: true,
      width: 160,
    },
    {
      headerName: t('fields.lastUsed'),
      field: 'tnkr_last_used',
      sortable: true,
      resizable: true,
      cellRenderer: 'DateRenderer',
      suppressSizeToFit: true,
      width: 160,
    },
    {
      headerName: t('fields.axleGroups'),
      field: 'tnkr_axle_groups',
      filterable: true,
      sortable: true,
      resizable: true,
      width: 240,
      suppressSizeToFit: true,
      hide: !siteUseAxleWeightLimit,
    },
    {
      headerName: t('fields.axleWeightLimits') + ' (' + t('units.kg') + ')',
      field: 'tnkr_axle_weights',
      filterable: true,
      sortable: true,
      resizable: true,
      width: 240,
      suppressSizeToFit: true,
      hide: !siteUseAxleWeightLimit,
    },
  ];
};

export default columns;
