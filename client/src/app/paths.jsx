import { lazy } from 'react';
import { ROUTES } from '../constants';

const paths = [
  {
    path: ROUTES.LOG_IN,
    component: lazy(() => import('../pages/login')),
  },
  {
    path: ROUTES.LOG_OUT,
    component: lazy(() => import('../pages/log-out')),
  },

  {
    path: ROUTES.UNAUTHORIZED,
    component: lazy(() => import('../pages/unauthorized')),
  },

  {
    path: ROUTES.EQUIPMENT_LIST,
    component: lazy(() => import('../pages/equipment-list')),
  },

  {
    path: ROUTES.EQUIPMENT_TYPES,
    component: lazy(() => import('../pages/equipment-types')),
  },

  {
    path: ROUTES.HOME,
    component: lazy(() => import('../pages/dashboard')),
  },

  {
    path: ROUTES.PERSONNEL,
    component: lazy(() => import('../pages/personnel')),
  },

  {
    path: ROUTES.LOGICAL_PRINTERS,
    component: lazy(() => import('../pages/logical-printers')),
  },

  {
    path: ROUTES.PHYSICAL_PRINTERS,
    component: lazy(() => import('../pages/physical-printers')),
  },

  {
    path: ROUTES.METERING,
    component: lazy(() => import('../pages/metering')),
  },

  {
    path: ROUTES.AREA,
    component: lazy(() => import('../pages/area')),
  },

  {
    path: ROUTES.TANK_INVENTORY,
    component: lazy(() => import('../pages/tank-inventory')),
  },

  {
    path: ROUTES.KEY_READER_DEVICES,
    component: lazy(() => import('../pages/key-reader-devices')),
  },

  {
    path: ROUTES.SITE_BALANCE,
    component: lazy(() => import('../pages/site-balance')),
  },

  {
    path: ROUTES.PRODUCT_INVENTORY,
    component: lazy(() => import('../pages/product-inventory')),
  },

  {
    path: ROUTES.BASE_PRODUCTS,
    component: lazy(() => import('../pages/base-products')),
  },

  {
    path: ROUTES.TANK_CONFIGURATION,
    component: lazy(() => import('../pages/tank-configuration')),
  },

  {
    path: ROUTES.JOURNAL,
    component: lazy(() => import('../pages/journal')),
  },

  {
    path: ROUTES.PERSONNEL_ON_SITE,
    component: lazy(() => import('../pages/personnel-on-site')),
  },

  {
    path: ROUTES.REPORT_CONFIGURATION,
    component: lazy(() => import('../pages/report-configuration')),
  },

  {
    path: ROUTES.REPORT_PROFILE,
    component: lazy(() => import('../pages/report-profile')),
  },

  {
    path: ROUTES.TANKER_LIST,
    component: lazy(() => import('../pages/tanker-list')),
  },

  {
    path: ROUTES.CUSTOMER_CATEGORIES,
    component: lazy(() => import('../pages/customer-categories')),
  },

  {
    path: ROUTES.TIME_CODES,
    component: lazy(() => import('../pages/time-codes')),
  },

  {
    path: ROUTES.HAZCHEM_CODES,
    component: lazy(() => import('../pages/hazchem-codes')),
  },

  {
    path: ROUTES.ALLOCATIONS,
    component: lazy(() => import('../pages/allocations')),
  },

  {
    path: ROUTES.ID_ASSIGNMENT,
    component: lazy(() => import('../pages/id-assignment')),
  },

  {
    path: ROUTES.LOAD_SCHEDULES,
    component: lazy(() => import('../pages/load-schedules')),
  },

  {
    path: ROUTES.TRANSACTION_LIST,
    component: lazy(() => import('../pages/transaction-list')),
  },

  {
    path: ROUTES.SELF_FUEL_TRANSACTION_LIST,
    component: lazy(() => import('../pages/self-fuel-transaction-list')),
  },

  {
    path: ROUTES.LOAD_BAYS,
    component: lazy(() => import('../pages/load-bays')),
  },

  {
    path: ROUTES.COMPANIES,
    component: lazy(() => import('../pages/companies')),
  },

  {
    path: ROUTES.TANK_GROUPS,
    component: lazy(() => import('../pages/tank-groups')),
  },

  {
    path: ROUTES.DRAWER_PRODUCTS,
    component: lazy(() => import('../pages/drawer-product')),
  },

  {
    path: ROUTES.PRODUCT_GROUPS,
    component: lazy(() => import('../pages/product-groups')),
  },

  {
    path: ROUTES.ALLOCATIONS,
    component: lazy(() => import('../pages/work-in-progress')),
  },

  {
    path: ROUTES.LOAD_METERS,
    component: lazy(() => import('../pages/load-meters')),
  },

  {
    path: ROUTES.COMPANY_BAY_MOVEMENT,
    component: lazy(() => import('../pages/company-bay-movement')),
  },

  {
    path: ROUTES.ON_DEMAND_REPORTS,
    component: lazy(() => import('../pages/on-demand-reports')),
  },

  {
    path: ROUTES.FOLIO_SUMMARY,
    component: lazy(() => import('../pages/folio-summary')),
  },

  {
    path: ROUTES.FOLIO_SCHEDULLING,
    component: lazy(() => import('../pages/folio-schedulling')),
  },

  {
    path: ROUTES.HOST_MESSAGING_INTERFACE,
    component: lazy(() => import('../pages/host-messaging-interface')),
  },

  {
    path: ROUTES.AUDITING_DATA,
    component: lazy(() => import('../pages/auditing-data')),
  },

  {
    path: ROUTES.FOLIO_SCHEDULLING,
    component: lazy(() => import('../pages/work-in-progress')),
  },

  {
    path: ROUTES.ROLE_ACCESS_MANAGEMENT,
    component: lazy(() => import('../pages/role-access-management')),
  },

  {
    path: ROUTES.EXPIRY_DATES,
    component: lazy(() => import('../pages/expiry-dates')),
  },

  {
    path: ROUTES.SITE_ACCESS_DEVICES,
    component: lazy(() => import('../pages/site-access-devices')),
  },

  {
    path: ROUTES.GATE_PERMISSION,
    component: lazy(() => import('../pages/gate-permission')),
  },

  {
    path: ROUTES.GATE_CONTROL,
    component: lazy(() => import('../pages/gate-control')),
  },

  {
    path: ROUTES.CUSTOMERS,
    component: lazy(() => import('../pages/customers')),
  },

  {
    path: ROUTES.ORDER_LISTING,
    component: lazy(() => import('../pages/order-listings')),
  },

  {
    path: ROUTES.ADDRESSES,
    component: lazy(() => import('../pages/addresses')),
  },

  {
    path: ROUTES.DELIVERY_LOCATIONS,
    component: lazy(() => import('../pages/delv-locations')),
  },

  {
    path: ROUTES.PARTNERS,
    component: lazy(() => import('../pages/partners')),
  },

  {
    path: ROUTES.PARTNERSHIP,
    component: lazy(() => import('../pages/partnership')),
  },

  {
    path: ROUTES.PRODUCT_MOVEMENTS,
    component: lazy(() => import('../pages/product-movements')),
  },

  {
    path: ROUTES.INVENTORY_REQUESTS,
    component: lazy(() => import('../pages/inventory-requests')),
  },

  {
    path: ROUTES.METER_DEVICES,
    component: lazy(() => import('../pages/meter-devices')),
  },

  {
    path: ROUTES.SPECIAL_MOVEMENTS,
    component: lazy(() => import('../pages/special-movements')),
  },

  {
    path: ROUTES.MOVEMENT_NOMINATIONS,
    component: lazy(() => import('../pages/movement-nominations')),
  },

  {
    path: ROUTES.MANUAL_TRANSACTIONS,
    component: lazy(() => import('../pages/manual-transactions')),
  },

  {
    path: ROUTES.MOVEMENT_REASONS,
    component: lazy(() => import('../pages/movement-reasons')),
  },

  {
    path: ROUTES.TANK_STATUS,
    component: lazy(() => import('../pages/tank-status')),
  },

  {
    path: ROUTES.TANK_STRAPPING,
    component: lazy(() => import('../pages/tank-strapping')),
  },

  {
    path: ROUTES.TANK_VIEW,
    component: lazy(() => import('../pages/work-in-progress')),
  },

  {
    path: ROUTES.BAY_VIEW,
    component: lazy(() => import('../pages/work-in-progress')),
  },

  {
    path: ROUTES.DRAWER_PRODUCT_ASSETS,
    component: lazy(() => import('../pages/work-in-progress')),
  },

  {
    path: ROUTES.ADAPTIVE_FLOW_CONTROL,
    component: lazy(() => import('../pages/adaptive-flow-control')),
  },

  {
    path: ROUTES.FSC_STATUS,
    component: lazy(() => import('../pages/fsc-status')),
  },

  {
    path: ROUTES.SETTINGS,
    component: lazy(() => import('../pages/settings')),
  },

  {
    path: ROUTES.CONFIGURATION,
    component: lazy(() => import('../pages/configuration')),
  },

  {
    path: ROUTES.TANKS,
    component: lazy(() => import('../pages/tanks')),
  },

];

export default paths;
