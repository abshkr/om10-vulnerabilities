import Loadable from 'react-loadable';
import { Loading } from '../components';
import { ROUTES } from '../constants';

const paths = [
  {
    path: ROUTES.UNAUTHORIZED,
    component: Loadable({
      loader: () => import('../pages/unauthorized'),
      loading: () => Loading
    })
  },

  {
    path: ROUTES.EQUIPMENT_LIST,
    component: Loadable({
      loader: () => import('../pages/equipmentList'),
      loading: Loading
    })
  },

  {
    path: ROUTES.PERSONNEL,
    component: Loadable({
      loader: () => import('../pages/personnel'),
      loading: () => Loading
    })
  },
  {
    path: ROUTES.LOGICAL_PRINTERS,
    component: Loadable({
      loader: () => import('../pages/logicalPrinters'),
      loading: () => Loading
    })
  },
  {
    path: ROUTES.PHYSICAL_PRINTERS,
    component: Loadable({
      loader: () => import('../pages/physicalPrinters'),
      loading: () => Loading
    })
  },
  {
    path: ROUTES.FOLIO_SUMMARY,
    component: Loadable({
      loader: () => import('../pages/folioSummary'),
      loading: () => Loading
    })
  },
  {
    path: ROUTES.METERING,
    component: Loadable({
      loader: () => import('../pages/metering'),
      loading: () => Loading
    })
  },
  {
    path: ROUTES.AREA,
    component: Loadable({
      loader: () => import('../pages/area'),
      loading: Loading
    })
  },
  {
    path: ROUTES.TANK_INVENTORY,
    component: Loadable({
      loader: () => import('../pages/tankInventory'),
      loading: () => Loading
    })
  },
  {
    path: ROUTES.SITE_BALANCE,
    component: Loadable({
      loader: () => import('../pages/siteBalance'),
      loading: () => Loading
    })
  },
  {
    path: ROUTES.PRODUCT_INVENTORY,
    component: Loadable({
      loader: () => import('../pages/productInventory'),
      loading: () => Loading
    })
  },
  {
    path: ROUTES.BASE_PRODUCTS,
    component: Loadable({
      loader: () => import('../pages/baseProducts'),
      loading: () => Loading
    })
  },
  {
    path: ROUTES.TANK_VIEW,
    component: Loadable({
      loader: () => import('../pages/tankView'),
      loading: () => Loading
    })
  },
  {
    path: ROUTES.TANK_CONFIGURATIONS,
    component: Loadable({
      loader: () => import('../pages/tankConfiguration'),
      loading: () => Loading
    })
  },
  {
    path: ROUTES.TANK_STATUS,
    component: Loadable({
      loader: () => import('../pages/tankStatus'),
      loading: () => Loading
    })
  },
  {
    path: ROUTES.ADAPTIVE_FLOW_CONTROL,
    component: Loadable({
      loader: () => import('../pages/adaptiveFlowControl'),
      loading: () => Loading
    })
  },
  {
    path: ROUTES.JOURNAL,
    component: Loadable({
      loader: () => import('../pages/journal'),
      loading: () => Loading
    })
  },

  {
    path: ROUTES.PERSONNEL_ON_SITE,
    component: Loadable({
      loader: () => import('../pages/personnelOnsite'),
      loading: Loading
    })
  },
  {
    path: ROUTES.REPORT_CONFIGURATION,
    component: Loadable({
      loader: () => import('../pages/reportConfiguration'),
      loading: Loading
    })
  },
  {
    path: ROUTES.REPORT_PROFILE,
    component: Loadable({
      loader: () => import('../pages/reportProfile'),
      loading: Loading
    })
  },
  {
    path: ROUTES.TANKER_LIST,
    component: Loadable({
      loader: () => import('../pages/tankerList'),
      loading: Loading
    })
  }
];

export default paths;
