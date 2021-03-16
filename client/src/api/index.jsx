import api from './api';

import * as TANKER_LIST from './tanker-list';
import * as AUTH from './auth';
import * as EQUIPMENT_LIST from './equipment-list';
import * as REPORT_PROFILE from './report-profile';
import * as REPORT_CONFIGURATION from './report-configuration';
import * as ID_ASSIGNMENT from './id-assignment';
import * as FOLIO_SUMMARY from './folio-summary';
import * as FOLIO_SCHEDULING from './folio-schedulling';
import * as PERSONNEL from './personnel';
import * as GATE_CONTROL from './gate-control';
import * as TIME_CODES from './time-codes';
import * as HAZCHEM_CODES from './hazchem-codes';
import * as DANGEROUS_GOODS from './dangerous_goods';
import * as LOGICAL_PRINTERS from './logical-printers';
import * as EXPIRY_DATES from './expiry-dates';
import * as TRANSACTION_LIST from './transaction-list';
import * as JOURNAL from './journal';
import * as ROLE_ACCESS_MANAGEMENT from './role-access-management';
import * as COMMON from './common';
import * as ALLOCATIONS from './allocations';
import * as AREA from './area';
import * as CUSTOMER_CATEGORIES from './customer-categories';
import * as BASE_PRODUCTS from './base-products';
import * as ADAPTIVE_FLOW_CONTROL from './adaptive-flow-control';
import * as STOCK_MANAGEMENT from './stock-management';
import * as PHYSICAL_PRINTERS from './physical-printers';
import * as PERSONNEL_ON_SITE from './personnel-on-site';
import * as FSC_STATUS from './fsc-status';
import * as TANKS from './tanks';
import * as SPECIAL_MOVEMENTS from './special-movements';
import * as MOVEMENT_NOMIATIONS from './movement-nominations';
import * as LOAD_SCHEDULES from './load-schedules';
import * as MOVEMENT_REASONS from './movement-reasons';
import * as METER_DEVICES from './meter-devices';
import * as SITE_ACCESS_DEVICES from './site-access-devices';
import * as MANUAL_TRANSACTIONS from './manual-transactions';
import * as GATE_PERMISSION from './gate-permission';
import * as ON_DEMAND_REPORTS from './on-demand-reports';
import * as INVENTORY_REQUESTS from './inventory-requests';
import * as PRODUCT_MOVEMENTS from './product-movements';
import * as SELF_FUEL_TRANSACTION_LIST from './self-fuel-transaction-list';
import * as COMPANIES from './companies';
import * as COMPANY_BAY_MOVEMENT from './company-bay-movement';
import * as PRODUCT_GROUPS from './product-groups';
import * as LOAD_METERS from './load-meters';
import * as ORDER_LISTINGS from './order-listings';
import * as TANK_STATUS from './tank-status';
import * as TANK_STRAPPING from './tank-strapping';
import * as AUDITING_DATA from './auditing-data';
import * as PARTNERSHIP from './partnership';
import * as PARTNERS from './partners';
import * as DASHBOARD from './dashboard';
import * as TANK_GROUPS from './tank-groups';
import * as KEY_READER_DEVICES from './key-reader-devices';
import * as SITE_CONFIGURATION from './site-configuration';
import * as ADDRESSES from './addresses';
import * as EQUIPMENT_TYPES from './equipment-types';
import * as DELV_LOCATIONS from './delv-locations';
import * as CUSTOMERS from './customers';
import * as DRAWER_PRODUCTS from './drawer-products';
import * as DELIVERY_DETAILS from './delivery-details';
import * as NOMINATION_TRANSACTIONS from './nomination-transactions';
import * as LOAD_BAYS from './load-bays';
import * as AXLE_WEIGHTS from './axle-weights';
import * as TRIP_AXLES from './trip-axles';
import * as TANK_BATCHES from './tank-batches';

export {
  AUTH,
  EQUIPMENT_LIST,
  DASHBOARD,
  PARTNERSHIP,
  PARTNERS,
  TANKS,
  TIME_CODES,
  HAZCHEM_CODES,
  DANGEROUS_GOODS,
  ID_ASSIGNMENT,
  EXPIRY_DATES,
  TRANSACTION_LIST,
  LOGICAL_PRINTERS,
  ROLE_ACCESS_MANAGEMENT,
  ADAPTIVE_FLOW_CONTROL,
  KEY_READER_DEVICES,
  COMMON,
  AREA,
  JOURNAL,
  BASE_PRODUCTS,
  CUSTOMER_CATEGORIES,
  ALLOCATIONS,
  STOCK_MANAGEMENT,
  PHYSICAL_PRINTERS,
  PERSONNEL_ON_SITE,
  FSC_STATUS,
  GATE_CONTROL,
  PERSONNEL,
  FOLIO_SUMMARY,
  FOLIO_SCHEDULING,
  REPORT_CONFIGURATION,
  REPORT_PROFILE,
  SPECIAL_MOVEMENTS,
  MOVEMENT_NOMIATIONS,
  LOAD_SCHEDULES,
  MOVEMENT_REASONS,
  METER_DEVICES,
  SITE_ACCESS_DEVICES,
  MANUAL_TRANSACTIONS,
  TANKER_LIST,
  GATE_PERMISSION,
  ON_DEMAND_REPORTS,
  INVENTORY_REQUESTS,
  PRODUCT_MOVEMENTS,
  SELF_FUEL_TRANSACTION_LIST,
  COMPANIES,
  COMPANY_BAY_MOVEMENT,
  PRODUCT_GROUPS,
  LOAD_METERS,
  ORDER_LISTINGS,
  TANK_STATUS,
  TANK_STRAPPING,
  AUDITING_DATA,
  TANK_GROUPS,
  SITE_CONFIGURATION,
  ADDRESSES,
  EQUIPMENT_TYPES,
  DELV_LOCATIONS,
  CUSTOMERS,
  DRAWER_PRODUCTS,
  DELIVERY_DETAILS,
  NOMINATION_TRANSACTIONS,
  LOAD_BAYS,
  AXLE_WEIGHTS,
  TRIP_AXLES,
  TANK_BATCHES,
};

export default api;
