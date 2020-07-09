import { ROUTES } from '../constants';

const generatePaths = (t) => [
  {
    page: t('pageMenu.operations'),
    name: t('pageNames.equipmentList'),
    path: ROUTES.EQUIPMENT_LIST,
  },

  {
    page: t('pageMenu.operations'),
    name: t('pageNames.equipmentTypes'),
    path: ROUTES.EQUIPMENT_TYPES,
  },

  {
    page: t('pageMenu.security'),
    name: t('pageNames.personnel'),
    path: ROUTES.PERSONNEL,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.logicalPrinters'),
    path: ROUTES.LOGICAL_PRINTERS,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.physicalPrinters'),
    path: ROUTES.PHYSICAL_PRINTERS,
  },

  {
    page: t('pageMenu.reports'),
    name: t('pageNames.metering'),
    path: ROUTES.METERING,
  },

  {
    page: t('pageMenu.security'),
    name: t('pageNames.area'),
    path: ROUTES.AREA,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.tankInventory'),
    path: ROUTES.TANK_INVENTORY,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.keyReaderDevices'),
    path: ROUTES.KEY_READER_DEVICES,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.siteBalance'),
    path: ROUTES.SITE_BALANCE,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.productInventory'),
    path: ROUTES.PRODUCT_INVENTORY,
  },

  {
    page: t('pageMenu.products'),
    name: t('pageNames.baseProducts'),
    path: ROUTES.BASE_PRODUCTS,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.tankConfiguration'),
    path: ROUTES.TANK_CONFIGURATION,
  },

  {
    page: t('pageMenu.reports'),
    name: t('pageNames.journal'),
    path: ROUTES.JOURNAL,
  },

  {
    page: t('pageMenu.reports'),
    name: t('pageNames.personnelOnSite'),
    path: ROUTES.PERSONNEL_ON_SITE,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.reportConfiguration'),
    path: ROUTES.REPORT_CONFIGURATION,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.reportProfile'),
    path: ROUTES.REPORT_PROFILE,
  },

  {
    page: t('pageMenu.operations'),
    name: t('pageNames.tankerList'),
    path: ROUTES.TANKER_LIST,
  },

  {
    page: t('pageMenu.companies'),
    name: t('pageNames.customerCategories'),
    path: ROUTES.CUSTOMER_CATEGORIES,
  },

  {
    page: t('pageMenu.security'),
    name: t('pageNames.timeCodes'),
    path: ROUTES.TIME_CODES,
  },

  {
    page: t('pageMenu.products'),
    name: t('pageNames.hazchemCodes'),
    path: ROUTES.HAZCHEM_CODES,
  },

  {
    page: t('pageMenu.products'),
    name: t('pageNames.dangerousGoods'),
    path: ROUTES.DANGEROUS_GOODS,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.allocations'),
    path: ROUTES.ALLOCATIONS,
  },

  {
    page: t('pageMenu.security'),
    name: t('pageNames.idAssignment'),
    path: ROUTES.ID_ASSIGNMENT,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.loadSchedules'),
    path: ROUTES.LOAD_SCHEDULES,
  },

  {
    page: t('pageMenu.operations'),
    name: t('pageNames.transactionList'),
    path: ROUTES.TRANSACTION_LIST,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.selfFuelTransactionList'),
    path: ROUTES.SELF_FUEL_TRANSACTION_LIST,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.loadBays'),
    path: ROUTES.LOAD_BAYS,
  },

  {
    page: t('pageMenu.companies'),
    name: t('pageNames.companies'),
    path: ROUTES.COMPANIES,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.tankGroups'),
    path: ROUTES.TANK_GROUPS,
  },

  {
    page: t('pageMenu.products'),
    name: t('pageNames.drawerProducts'),
    path: ROUTES.DRAWER_PRODUCTS,
  },

  {
    page: t('pageMenu.products'),
    name: t('pageNames.productGroups'),
    path: ROUTES.PRODUCT_GROUPS,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.loadMeters'),
    path: ROUTES.LOAD_METERS,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.companyBayMovement'),
    path: ROUTES.COMPANY_BAY_MOVEMENT,
  },

  {
    page: t('pageMenu.reports'),
    name: t('pageNames.onDemandReports'),
    path: ROUTES.ON_DEMAND_REPORTS,
  },

  {
    page: t('pageMenu.reports'),
    name: t('pageNames.folioSummary'),
    path: ROUTES.FOLIO_SUMMARY,
  },

  {
    page: t('pageMenu.reports'),
    name: t('pageNames.folioScheduling'),
    path: ROUTES.FOLIO_SCHEDULLING,
  },

  {
    page: t('pageMenu.reports'),
    name: t('pageNames.hostMessagingInterface'),
    path: ROUTES.HOST_MESSAGING_INTERFACE,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.auditingData'),
    path: ROUTES.AUDITING_DATA,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.folioScheduling'),
    path: ROUTES.FOLIO_SCHEDULLING,
  },

  {
    page: t('pageMenu.security'),
    name: t('pageNames.roleAccessManagement'),
    path: ROUTES.ROLE_ACCESS_MANAGEMENT,
  },

  {
    page: t('pageMenu.security'),
    name: t('pageNames.expiryDates'),
    path: ROUTES.EXPIRY_DATES,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.siteAccessDevices'),
    path: ROUTES.SITE_ACCESS_DEVICES,
  },

  {
    page: t('pageMenu.security'),
    name: t('pageNames.gatePermission'),
    path: ROUTES.GATE_PERMISSION,
  },

  {
    page: t('pageMenu.operations'),
    name: t('pageNames.gateControl'),
    path: ROUTES.GATE_CONTROL,
  },

  {
    page: t('pageMenu.companies'),
    name: t('pageNames.customers'),
    path: ROUTES.CUSTOMERS,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.orderListing'),
    path: ROUTES.ORDER_LISTING,
  },

  {
    page: t('pageMenu.companies'),
    name: t('pageNames.addresses'),
    path: ROUTES.ADDRESSES,
  },

  {
    page: t('pageMenu.companies'),
    name: t('pageNames.deliveryLocations'),
    path: ROUTES.DELIVERY_LOCATIONS,
  },

  {
    page: t('pageMenu.companies'),
    name: t('pageNames.partners'),
    path: ROUTES.PARTNERS,
  },

  {
    page: t('pageMenu.companies'),
    name: t('pageNames.partnership'),
    path: ROUTES.PARTNERSHIP,
  },

  {
    page: t('pageMenu.operations'),
    name: t('pageNames.productMovements'),
    path: ROUTES.PRODUCT_MOVEMENTS,
  },

  {
    page: t('pageMenu.operations'),
    name: t('pageNames.inventoryRequests'),
    path: ROUTES.INVENTORY_REQUESTS,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.meterDevices'),
    path: ROUTES.METER_DEVICES,
  },

  {
    page: t('pageMenu.operations'),
    name: t('pageNames.specialMovements'),
    path: ROUTES.SPECIAL_MOVEMENTS,
  },

  {
    page: t('pageMenu.operations'),
    name: t('pageNames.movementNominations'),
    path: ROUTES.MOVEMENT_NOMINATIONS,
  },

  {
    page: t('pageMenu.operations'),
    name: t('pageNames.manualTransactions'),
    path: ROUTES.MANUAL_TRANSACTIONS,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.movementReasons'),
    path: ROUTES.MOVEMENT_REASONS,
  },

  {
    page: t('pageMenu.modules'),
    name: t('pageNames.bayView'),
    path: ROUTES.BAY_VIEW,
  },

  {
    page: t('pageMenu.modules'),
    name: t('pageNames.adaptiveFlowControl'),
    path: ROUTES.ADAPTIVE_FLOW_CONTROL,
  },

  {
    page: t('pageMenu.modules'),
    name: t('pageNames.fscStatus'),
    path: ROUTES.FSC_STATUS,
  },

  {
    page: t('pageMenu.config'),
    name: t('pageNames.tanks'),
    path: ROUTES.TANKS,
  },
];

export default generatePaths;
