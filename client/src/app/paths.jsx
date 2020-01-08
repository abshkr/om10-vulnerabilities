import Loadable from 'react-loadable';

import { Loading } from '../components';
import { ROUTES } from '../constants';

const paths = [
  {
    path: ROUTES.LOG_IN,
    component: Loadable({
      loader: () => import('../pages/login'),
      loading: Loading
    })
  },
  {
    path: ROUTES.LOG_OUT,
    component: Loadable({
      loader: () => import('../pages/logout'),
      loading: Loading
    })
  },

  {
    path: ROUTES.UNAUTHORIZED,
    component: Loadable({
      loader: () => import('../pages/unauthorized'),
      loading: Loading
    })
  },

  {
    path: ROUTES.EQUIPMENT_LIST,
    component: Loadable({
      loader: () => import('../pages/equipment-list'),
      loading: Loading
    })
  },

  {
    path: ROUTES.PERSONNEL,
    component: Loadable({
      loader: () => import('../pages/personnel'),
      loading: Loading
    })
  },

  {
    path: ROUTES.LOGICAL_PRINTERS,
    component: Loadable({
      loader: () => import('../pages/logical-printers'),
      loading: Loading
    })
  },

  {
    path: ROUTES.PHYSICAL_PRINTERS,
    component: Loadable({
      loader: () => import('../pages/physical-printers'),
      loading: Loading
    })
  },

  {
    path: ROUTES.METERING,
    component: Loadable({
      loader: () => import('../pages/metering'),
      loading: Loading
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
      loader: () => import('../pages/tank-inventory'),
      loading: Loading
    })
  },

  {
    path: ROUTES.SITE_BALANCE,
    component: Loadable({
      loader: () => import('../pages/site-balance'),
      loading: Loading
    })
  },

  {
    path: ROUTES.PRODUCT_INVENTORY,
    component: Loadable({
      loader: () => import('../pages/product-inventory'),
      loading: Loading
    })
  },

  {
    path: ROUTES.BASE_PRODUCTS,
    component: Loadable({
      loader: () => import('../pages/base-products'),
      loading: Loading
    })
  },

  {
    path: ROUTES.TANK_CONFIGURATION,
    component: Loadable({
      loader: () => import('../pages/tank-configuration'),
      loading: Loading
    })
  },

  {
    path: ROUTES.JOURNAL,
    component: Loadable({
      loader: () => import('../pages/journal'),
      loading: Loading
    })
  },

  {
    path: ROUTES.PERSONNEL_ON_SITE,
    component: Loadable({
      loader: () => import('../pages/personnel-on-site'),
      loading: Loading
    })
  },

  {
    path: ROUTES.REPORT_CONFIGURATION,
    component: Loadable({
      loader: () => import('../pages/report-configuration'),
      loading: Loading
    })
  },

  {
    path: ROUTES.REPORT_PROFILE,
    component: Loadable({
      loader: () => import('../pages/report-profile'),
      loading: Loading
    })
  },

  {
    path: ROUTES.TANKER_LIST,
    component: Loadable({
      loader: () => import('../pages/tanker-list'),
      loading: Loading
    })
  },

  {
    path: ROUTES.CUSTOMER_CATEGORIES,
    component: Loadable({
      loader: () => import('../pages/customer-categories'),
      loading: Loading
    })
  },

  {
    path: ROUTES.TIME_CODES,
    component: Loadable({
      loader: () => import('../pages/time-codes'),
      loading: Loading
    })
  },

  {
    path: ROUTES.HAZCHEM_CODES,
    component: Loadable({
      loader: () => import('../pages/hazchem-codes'),
      loading: Loading
    })
  },

  {
    path: ROUTES.ALLOCATIONS,
    component: Loadable({
      loader: () => import('../pages/allocations'),
      loading: Loading
    })
  },

  {
    path: ROUTES.ID_ASSIGNMENT,
    component: Loadable({
      loader: () => import('../pages/id-assignment'),
      loading: Loading
    })
  }
];

export default paths;
