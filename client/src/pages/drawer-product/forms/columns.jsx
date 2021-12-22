import { BASE_PRODUCTS } from 'constants/routes';

const columns = (t, config, form, pipenodeBases, user_code) => [
  {
    headerName: t('fields.pitemProdCode'),
    field: 'pitem_base_code',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 140,
    pinned: 'left',
    cellRenderer: 'LinkRenderer',
    cellRendererParams: {
      endpoint: BASE_PRODUCTS,
      field: 'product',
      index: 'prod_code',
    },
  },
  {
    headerName: t('fields.pitemProdName'),
    field: 'pitem_base_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 180,
    pinned: 'left',
  },
  {
    headerName: t('fields.pitemRatioValue'),
    field: 'pitem_ratio_value',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 80,
    hide: (config?.siteRecipeOnPercent && user_code !== '9999'),
  },
  {
    headerName: t('fields.pitemRatioAsPercent'),
    field: 'pitem_ratio_as_percent',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    hide: config?.siteRecipeOnPercent,
    width: 120,
    cellRenderer: 'RatioPercentageRenderer',
    cellRendererParams: {
      form: form,
      ratioField: 'bases',
      codeField: 'pitem_base_code',
      valueField: 'pitem_ratio_value',
      adtvFlag: 'pitem_base_class',
      seqField: 'pitem_ratio_seq',
      pipenode: pipenodeBases,
      adtvDest: config?.siteRecipeOnPipenode,
    },
  },
  {
    headerName: t('fields.pitemRatioPercentPPM'),
    field: 'pitem_ratio_percent_ppm',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    hide: !config?.siteRecipeOnPercent,
    width: 120,
    cellRenderer: 'PpmPercentageRenderer',
    cellRendererParams: {
      adtvFlag: 'pitem_base_class',
    },
  },
  {
    headerName: t('fields.pitemBltolFlag'),
    field: 'pitem_bltol_flag',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    cellRenderer: 'BooleanRenderer',
    width: 180,
  },
  {
    headerName: t('fields.pitemBltolNtol'),
    field: 'pitem_bltol_ntol',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
  },
  {
    headerName: t('fields.pitemBltolPtol'),
    field: 'pitem_bltol_ptol',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
  },

  {
    headerName: t('fields.pitemHotMain'),
    field: 'pitem_hot_main',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
    suppressSizeToFit: true,
    hide: !config.manageHotProduct,
    width: 150,
  },
  {
    headerName: t('fields.pitemAdtvFlag'),
    field: 'pitem_adtv_flag',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
    suppressSizeToFit: true,
    width: 150,
  },

  {
    headerName: t('fields.pitemRatioSubseq'),
    field: 'pitem_ratio_subseq',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioSeq'),
    field: 'pitem_ratio_seq',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioSubcount'),
    field: 'pitem_ratio_subcount',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioCount'),
    field: 'pitem_ratio_count',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemRatioTotal'),
    field: 'pitem_ratio_total',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemBaseGroup'),
    field: 'pitem_base_group',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemBaseGrpname'),
    field: 'pitem_base_grpname',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },

  {
    headerName: t('fields.pitemBaseClass'),
    field: 'pitem_base_class',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
  },
  {
    headerName: t('fields.pitemBclassName'),
    field: 'pitem_bclass_name',
    filter: 'MultiFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
  },
  {
    headerName: t('fields.baseLimitPresetHt'),
    field: 'pitem_hot_check',
    filter: 'BooleanFilter',
    sortable: true,
    resizable: true,
    cellRenderer: 'BooleanRenderer',
    suppressSizeToFit: true,
    hide: !config.manageHotProduct,
    width: 150,
  },

  {
    headerName: t('fields.pitemBaseTunit'),
    field: 'pitem_base_tunit',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemBaseTunitname'),
    field: 'pitem_base_tunitname',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },
  {
    headerName: t('fields.pitemBaseRpttemp'),
    field: 'pitem_base_rpttemp',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 100,
    hide: true,
  },

  {
    headerName: t('fields.pitemBclassDensLo'),
    field: 'pitem_bclass_dens_lo',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
  },
  {
    headerName: t('fields.pitemBclassDensHi'),
    field: 'pitem_bclass_dens_hi',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
  },
  {
    headerName: t('fields.pitemBclassVcfAlg'),
    field: 'pitem_bclass_vcf_alg',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
    hide: true,
  },
  {
    headerName: t('fields.pitemBclassTempLo'),
    field: 'pitem_bclass_temp_lo',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
  },
  {
    headerName: t('fields.pitemBclassTempHi'),
    field: 'pitem_bclass_temp_hi',
    filter: 'FuzzyFilter',
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    width: 130,
  },
];

export default columns;
