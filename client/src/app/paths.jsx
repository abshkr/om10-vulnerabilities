import { lazy } from 'react';
import { ROUTES } from '../constants';

const paths = [
  {
    path: ROUTES.LOG_IN,
    component: lazy(() => import('../pages/login'))
  },
  {
    path: ROUTES.LOG_OUT,
    component: lazy(() => import('../pages/logout'))
  },

  {
    path: ROUTES.UNAUTHORIZED,
    component: lazy(() => import('../pages/unauthorized'))
  },

  {
    path: ROUTES.EQUIPMENT_LIST,
    component: lazy(() => import('../pages/equipment-list'))
  },

  {
    path: ROUTES.DASHBOARD,
    component: lazy(() => import('../pages/dashboard'))
  },

  {
    path: ROUTES.PERSONNEL,
    component: lazy(() => import('../pages/personnel'))
  },

  {
    path: ROUTES.LOGICAL_PRINTERS,
    component: lazy(() => import('../pages/logical-printers'))
  },

  {
    path: ROUTES.PHYSICAL_PRINTERS,
    component: lazy(() => import('../pages/physical-printers'))
  },

  {
    path: ROUTES.METERING,
    component: lazy(() => import('../pages/metering'))
  },

  {
    path: ROUTES.AREA,
    component: lazy(() => import('../pages/area'))
  },

  {
    path: ROUTES.TANK_INVENTORY,
    component: lazy(() => import('../pages/tank-inventory'))
  },

  {
    path: ROUTES.SITE_BALANCE,
    component: lazy(() => import('../pages/site-balance'))
  },

  {
    path: ROUTES.PRODUCT_INVENTORY,
    component: lazy(() => import('../pages/product-inventory'))
  },

  {
    path: ROUTES.BASE_PRODUCTS,
    component: lazy(() => import('../pages/base-products'))
  },

  {
    path: ROUTES.TANK_CONFIGURATION,
    component: lazy(() => import('../pages/tank-configuration'))
  },

  {
    path: ROUTES.JOURNAL,
    component: lazy(() => import('../pages/journal'))
  },

  {
    path: ROUTES.PERSONNEL_ON_SITE,
    component: lazy(() => import('../pages/personnel-on-site'))
  },

  {
    path: ROUTES.REPORT_CONFIGURATION,
    component: lazy(() => import('../pages/report-configuration'))
  },

  {
    path: ROUTES.REPORT_PROFILE,
    component: lazy(() => import('../pages/report-profile'))
  },

  {
    path: ROUTES.TANKER_LIST,
    component: lazy(() => import('../pages/tanker-list'))
  },

  {
    path: ROUTES.CUSTOMER_CATEGORIES,
    component: lazy(() => import('../pages/customer-categories'))
  },

  {
    path: ROUTES.TIME_CODES,
    component: lazy(() => import('../pages/time-codes'))
  },

  {
    path: ROUTES.HAZCHEM_CODES,
    component: lazy(() => import('../pages/hazchem-codes'))
  },

  {
    path: ROUTES.ALLOCATIONS,
    component: lazy(() => import('../pages/allocations'))
  },

  {
    path: ROUTES.ID_ASSIGNMENT,
    component: lazy(() => import('../pages/id-assignment'))
  }
];

export default paths;
