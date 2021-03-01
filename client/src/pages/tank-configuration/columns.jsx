import { BASE_PRODUCTS } from 'constants/routes';

const columns = (config, t) => [
  {
    headerName: t('fields.code'),
    field: 'tank_code',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    pinned: 'left',
    width: 100,
  },
  {
    headerName: t('fields.name'),
    field: 'tank_name',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.terminal'),
    field: 'tank_terminal',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    hide: true,
  },
  {
    headerName: t('fields.terminal'),
    field: 'tank_sitename',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
  },
  {
    headerName: t('fields.baseProductCode'),
    field: 'tank_base',
    sortable: true,
    resizable: true,
    filter: 'FuzzyFilter',
    cellRenderer: 'LinkRenderer',
    cellRendererParams: {
      endpoint: BASE_PRODUCTS,
      field: 'product',
      index: 'tank_base',
    },
  },
  {
    headerName: t('fields.baseProductName'),
    field: 'tank_base_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },
  {
    headerName: t('fields.productCategory'),
    field: 'tank_bclass_name',
    sortable: true,
    resizable: true,
    filter: 'MultiFilter',
  },
  {
    headerName: `${t('fields.standardDensity')} (${t('units.kg/m3')})`,
    field: 'tank_density',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.dailyVarianceLimit')} (${t('units.volume')})`,
    field: 'tank_dtol_volume',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.dailyVarianceLimit')} (%)`,
    field: 'tank_dtol_percent',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.monthlyVarianceLimit')} (${t('units.volume')})`,
    field: 'tank_mtol_volume',
    sortable: true,
    resizable: true,
  },
  {
    headerName: `${t('fields.monthlyVarianceLimit')} (%)`,
    field: 'tank_mtol_percent',
    sortable: true,
    resizable: true,
  },
  {
    headerName: t('fields.adaptiveArmPriority'),
    field: 'afc_priority',
    sortable: true,
    resizable: true,
    hide: !config?.siteUseAFC,
  },

  {
    headerName: t('fields.tankMaxFlowRate'),
    field: 'tank_max_flow',
    sortable: true,
    resizable: true,
    cellRenderer: 'FlowRateRenderer',
    hide: !config?.siteUseAFC,
    width: 240,
  },
];

export default columns;
