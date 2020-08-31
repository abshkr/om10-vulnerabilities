const detailColumns = (isFromNomination, t) => [
  {
    headerName: t('fields.meters'),
    children: [
      {
        headerName: t('fields.arm'),
        field: isFromNomination ? 'trsb_id_trsf_id' : 'baa_bay_seq',
        sortable: true,
        resizable: true,
      },

      {
        headerName: t('fields.meter'),
        field: 'trsb_meter',
        sortable: true,
        resizable: true,
      },

      {
        headerName: t('fields.meterOpeningAmbient'),
        field: isFromNomination ? 'trsb_opn_amb' : 'trsf_opn_amb',
        sortable: true,
        resizable: true,
      },
      {
        headerName: t('fields.meterClosingAmbient'),
        field: isFromNomination ? 'trsb_cls_amb' : 'trsf_cls_amb',
        sortable: true,
        resizable: true,
      },
      {
        headerName: t('fields.meterOpeningCorrected'),
        field: isFromNomination ? 'trsb_opn_cor' : 'trsf_opn_cor',
        sortable: true,
        resizable: true,
      },
      {
        headerName: t('fields.meterClosingCorrected'),
        field: isFromNomination ? 'trsb_cls_cor' : 'trsf_cls_cor',
        sortable: true,
        resizable: true,
      },
      {
        headerName: t('fields.meterOpeningMass'),
        field: isFromNomination ? 'trsb_opn_kg' : 'trsf_open_kg',
        sortable: true,
        resizable: true,
      },
      {
        headerName: t('fields.meterClosingMass'),
        field: isFromNomination ? 'trsb_cls_kg' : 'trsf_close_kg',
        sortable: true,
        resizable: true,
      },
    ],
  },
  {
    headerName: t('fields.baseProducts'),
    children: [
      {
        headerName: t('fields.code'),
        field: 'base_code',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
      },

      {
        headerName: t('fields.name'),
        field: 'base_name',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
      },

      {
        headerName: t('fields.tankCode'),
        field: 'trsb_tk_tankcode',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
      },
      {
        headerName: t('fields.ambient') + ' (' + t('units.ltr') + ')',
        field: 'trsb_avl',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
      },
      {
        headerName: t('fields.standard') + ' (' + t('units.ltr') + ')',
        field: 'trsb_cvl',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
      },
      {
        headerName: t('fields.mass') + ' (kg)',
        field: 'trsb_kg',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
      },
      {
        headerName: t('fields.density') + ' (kg/m3)',
        field: 'trsb_dns',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
      },
      {
        headerName: t('fields.temp') + ' (C)',
        field: 'trsb_tmp',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
      },
      {
        headerName: t('fields.api') + ' (@60F)',
        field: 'trsb_api',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
      },
      {
        headerName: t('fields.temp') + ' (F)',
        field: 'trsb_tmp_f',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
      },
    ],
  },
];

export default detailColumns;
