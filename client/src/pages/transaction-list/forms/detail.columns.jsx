const detailColumns = (isFromNomination, t) => [
  {
    headerName: t('fields.meters'),
    children: [
      {
        headerName: t('fields.arm'),
        field: 'trsb_id_trsf_id',
        sortable: true,
        resizable: true
      },

      {
        headerName: t('fields.meter'),
        field: 'trsb_meter',
        sortable: true,
        resizable: true
      },

      {
        headerName: t('fields.openingAmbient'),
        field: 'trsb_opn_amb',
        sortable: true,
        resizable: true
      },
      {
        headerName: t('fields.closingAmbient'),
        field: 'trsb_cls_amb',
        sortable: true,
        resizable: true
      },
      {
        headerName: t('fields.openingCorrected'),
        field: 'trsb_opn_cor',
        sortable: true,
        resizable: true
      },
      {
        headerName: t('fields.closingCorrected'),
        field: 'trsb_cls_cor',
        sortable: true,
        resizable: true
      },
      {
        headerName: t('fields.openingMass'),
        field: 'trsb_opn_kg',
        sortable: true,
        resizable: true
      },
      {
        headerName: t('fields.closingMass'),
        field: 'trsb_cls_kg',
        sortable: true,
        resizable: true
      }
    ]
  },
  {
    headerName: t('fields.baseProducts'),
    children: [
      {
        headerName: t('fields.code'),
        field: 'base_code',
        sortable: true,
        resizable: true,
        hide: !isFromNomination
      },

      {
        headerName: t('fields.name'),
        field: 'base_name',
        sortable: true,
        resizable: true,
        hide: !isFromNomination
      },

      {
        headerName: t('fields.tankCode'),
        field: 'trsb_tk_tankcode',
        sortable: true,
        resizable: true,
        hide: !isFromNomination
      },
      {
        headerName: t('fields.ambient') + ' (L)',
        field: 'trsb_avl',
        sortable: true,
        resizable: true,
        hide: !isFromNomination
      },
      {
        headerName: t('fields.standard') + ' (L)',
        field: 'trsb_cvl',
        sortable: true,
        resizable: true,
        hide: !isFromNomination
      },
      {
        headerName: t('fields.mass') + ' (kg)',
        field: 'trsb_kg',
        sortable: true,
        resizable: true,
        hide: !isFromNomination
      },
      {
        headerName: t('fields.density') + ' (kg/m3)',
        field: 'trsb_dns',
        sortable: true,
        resizable: true,
        hide: !isFromNomination
      },
      {
        headerName: t('fields.temp') + ' (C)',
        field: 'trsb_tmp',
        sortable: true,
        resizable: true,
        hide: !isFromNomination
      },
      {
        headerName: t('fields.api') + ' (@60F)',
        field: 'trsb_api',
        sortable: true,
        resizable: true,
        hide: !isFromNomination
      },
      {
        headerName: t('fields.temp') + ' (F)',
        field: 'trsb_tmp_f',
        sortable: true,
        resizable: true,
        hide: !isFromNomination
      }
    ]
  }
];

export default detailColumns;
