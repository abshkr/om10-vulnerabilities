const detailColumns = (isFromNomination, t, config) => [
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
        headerName: t('fields.meterOpeningAmbient') + ' (' + t('units.ltr') + ')',
        field: isFromNomination ? 'trsb_opn_amb' : 'trsf_opn_amb',
        sortable: true,
        resizable: true,
      },
      {
        headerName: t('fields.meterClosingAmbient') + ' (' + t('units.ltr') + ')',
        field: isFromNomination ? 'trsb_cls_amb' : 'trsf_cls_amb',
        sortable: true,
        resizable: true,
      },
      {
        headerName: t('fields.meterOpeningCorrected') + ' (' + t('units.ltr') + ')',
        field: isFromNomination ? 'trsb_opn_cor' : 'trsf_opn_cor',
        sortable: true,
        resizable: true,
      },
      {
        headerName: t('fields.meterClosingCorrected') + ' (' + t('units.ltr') + ')',
        field: isFromNomination ? 'trsb_cls_cor' : 'trsf_cls_cor',
        sortable: true,
        resizable: true,
      },
      {
        headerName: t('fields.meterOpeningMass') + ' (' + t('units.kg') + ')',
        field: isFromNomination ? 'trsb_opn_kg' : 'trsf_open_kg',
        sortable: true,
        resizable: true,
      },
      {
        headerName: t('fields.meterClosingMass') + ' (' + t('units.kg') + ')',
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
        headerName: t(config?.siteLabelUser + 'fields.ambient') + ' (' + t('units.ltr') + ')',
        field: 'trsb_avl',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
        cellRenderer: 'QuantityRenderer',
        cellRendererParams: {
          digits: String(config?.precisionVolume),
          min: '100',
          adtvFlag: 'base_cat',
          adtvDigits: config?.precisionAdditive,
        },
      },
      {
        headerName: t(config?.siteLabelUser + 'fields.standard') + ' (' + t('units.ltr') + ')',
        field: 'trsb_cvl',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
        cellRenderer: 'QuantityRenderer',
        cellRendererParams: {
          digits: String(config?.precisionVolume),
          min: '100',
          adtvFlag: 'base_cat',
          adtvDigits: config?.precisionAdditive,
        },
      },
      {
        headerName: t(config?.siteLabelUser + 'fields.mass') + ' (' + t('units.kg') + ')',
        field: 'trsb_kg',
        sortable: true,
        resizable: true,
        hide: !isFromNomination || !config?.siteMassInVacuum,
        cellRenderer: 'QuantityRenderer',
        cellRendererParams: {
          digits: String(config?.precisionMass),
          min: '100',
          adtvFlag: 'base_cat',
          adtvDigits: config?.precisionAdditive,
        },
      },
      {
        headerName: t(config?.siteLabelUser + 'fields.massInAir') + ' (' + t('units.kg') + ')',
        field: 'trsb_air_kg',
        sortable: true,
        resizable: true,
        hide: !isFromNomination || !config?.siteMassInAir,
        cellRenderer: 'MassInAirRenderer',
        cellRendererParams: {
          digits: String(config?.precisionMass),
          massInVacuum: 'trsb_kg',
          standardVolume: 'trsb_cvl',
          factor: config?.airBuoyancyFactor,
        },
      },
      {
        headerName: t('fields.density') + ' (' + t('units.kg/m3') + ')',
        field: 'trsb_dns',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
        cellRenderer: 'DensityRenderer',
        cellRendererParams: {
          digits: String(config?.precisionDensity),
        },
      },
      {
        headerName: t('fields.temp') + ' (' + t('units.degC') + ')',
        field: 'trsb_tmp',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
        cellRenderer: 'TemperatureRenderer',
        cellRendererParams: {
          digits: String(config?.precisionTemperature),
        },
      },

      {
        headerName: t('fields.vcf'),
        field: 'trsb_vcf',
        filter: 'FuzzyFilter',
        sortable: true,
        resizable: true,
        hide: !config?.siteUseVCF,
        cellRenderer: 'VcfRenderer',
        cellRendererParams: {
          digits: String(config?.precisionVCF),
          ambientVolume: 'trsb_avl',
          standardVolume: 'trsb_cvl',
        },
      },

      {
        headerName: t('fields.api'),
        field: 'trsb_api',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
      },
      {
        headerName: t('fields.temp') + ' (' + t('units.degF') + ')',
        field: 'trsb_tmp_f',
        sortable: true,
        resizable: true,
        hide: !isFromNomination,
      },
      {
        headerName: t('fields.tankBatchNumber'),
        field: 'trsb_batch_no',
        sortable: true,
        resizable: true,
        width: 150,
        suppressSizeToFit: true,
        hide: !isFromNomination || !config?.siteUseTankBatch,
      },
    ],
  },
];

export default detailColumns;
