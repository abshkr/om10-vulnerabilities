import React from 'react';

import Icon from '@ant-design/icons';

import { ReactComponent as Dashboard } from './dashboard.svg';
import { ReactComponent as Gantry } from './tank-truck.svg';
import { ReactComponent as Schedules } from './calendar.svg';
import { ReactComponent as Reports } from './report.svg';
import { ReactComponent as AccessControl } from './security.svg';
import { ReactComponent as Customers } from './customers.svg';
import { ReactComponent as StockManagement } from './stock.svg';
import { ReactComponent as Printer } from './printer.svg';
import { ReactComponent as Operations } from './operations.svg';
import { ReactComponent as User } from './user.svg';
import { ReactComponent as Australia } from './au.svg';
import { ReactComponent as China } from './cn.svg';
import { ReactComponent as England } from './en.svg';

import { ReactComponent as Tank } from './tank.svg';
import { ReactComponent as List } from './list.svg';
import { ReactComponent as Create } from './new.svg';
import { ReactComponent as Refresh } from './rotate.svg';
import { ReactComponent as Export } from './arrow.svg';
import { ReactComponent as Search } from './search.svg';
import { ReactComponent as Tanks } from './fuel.svg';
import { ReactComponent as Product } from './product.svg';
import { ReactComponent as Office } from './office.svg';
import { ReactComponent as Modules } from './modules.svg';
import { ReactComponent as Config } from './settings.svg';

import { ReactComponent as Unauthorized } from './unauthorized.svg';
import { ReactComponent as Lock } from './lock.svg';
import { ReactComponent as Unlock } from './unlock.svg';

import { ReactComponent as ProductInventory } from './stock/product-inventory.svg';
import { ReactComponent as SelfFuelTransactionList } from './stock/self-fueling-transactions.svg';
import { ReactComponent as SiteBalance } from './stock/site-balance.svg';
import { ReactComponent as TankInventory } from './stock/tank-inventory.svg';
import { ReactComponent as TankScreen } from './stock/tanks.svg';
import { ReactComponent as TankStatus } from './stock/tank-status.svg';

import { ReactComponent as Addresses } from './companies/addresses.svg';
import { ReactComponent as Allocations } from './companies/allocations.svg';
import { ReactComponent as CustomerCategories } from './companies/customer-categories.svg';
import { ReactComponent as CustomerScreen } from './companies/customers.svg';
import { ReactComponent as DeliveryLocations } from './companies/delivery-locations.svg';
import { ReactComponent as Partners } from './companies/partners.svg';
import { ReactComponent as Partnership } from './companies/partnership.svg';

import { ReactComponent as BaseProducts } from './products/base-products.svg';
import { ReactComponent as DangerousGoods } from './products/dangerous-goods.svg';
import { ReactComponent as DrawerProducts } from './products/drawer-products.svg';
import { ReactComponent as HazchemCodes } from './products/hazchem-codes.svg';
import { ReactComponent as ProductGroups } from './products/product-groups.svg';

import { ReactComponent as AdaptiveFlowControl } from './modules/adaptive-flow-control.svg';
import { ReactComponent as BayView } from './modules/bay-view.svg';
import { ReactComponent as FastTrack } from './modules/fast-track.svg';
import { ReactComponent as FSCStatus } from './modules/fsc-status.svg';
import { ReactComponent as TankView } from './modules/tank-view.svg';

import { ReactComponent as AuditingData } from './reports/auditing-data.svg';
import { ReactComponent as FolioScheduling } from './reports/folio-scheduling.svg';
import { ReactComponent as FolioSummary } from './reports/folio-summary.svg';
import { ReactComponent as HostMessagingInterface } from './reports/host-messaging-interface.svg';
import { ReactComponent as Journal } from './reports/journal.svg';
import { ReactComponent as PersonnelOnSite } from './reports/personnel-on-site.svg';

import { ReactComponent as Area } from './security/area.svg';
import { ReactComponent as ExpiryDates } from './security/expiry-dates.svg';
import { ReactComponent as IdAssignment } from './security/id-assignment.svg';
import { ReactComponent as Personnel } from './security/personnel.svg';
import { ReactComponent as RoleAccessManagement } from './security/role-access-management.svg';
import { ReactComponent as Timecodes } from './security/timecodes.svg';

import { ReactComponent as CompanyBayMovement } from './configuration/company-bay-movements.svg';
import { ReactComponent as KeyReaderDevices } from './configuration/key-reader-devices.svg';
import { ReactComponent as LoadBays } from './configuration/load-bays.svg';
import { ReactComponent as LoadMeters } from './configuration/load-meters.svg';
import { ReactComponent as LogicalPrinters } from './configuration/logical-printers.svg';
import { ReactComponent as MeterDevices } from './configuration/meter-devices.svg';
import { ReactComponent as MovementReasons } from './configuration/movement-reasons.svg';
import { ReactComponent as PhysicalPrinters } from './configuration/physical-printers.svg';
import { ReactComponent as ReportConfiguration } from './configuration/report-configuration.svg';
import { ReactComponent as ReportProfile } from './configuration/report-profile.svg';
import { ReactComponent as SiteAccessDevices } from './configuration/site-access-devices.svg';
import { ReactComponent as TankConfiguration } from './configuration/tank-configuration.svg';

import { ReactComponent as EquipmentList } from './operations/equipment-list.svg';
import { ReactComponent as EquipmentTypes } from './operations/equipment-types.svg';
import { ReactComponent as GateControl } from './operations/gate-control.svg';
import { ReactComponent as InventoryRequests } from './operations/inventory-requests.svg';
import { ReactComponent as LoadSchedules } from './operations/load-schedules.svg';
import { ReactComponent as ManualTransactions } from './operations/manual-transactions.svg';
import { ReactComponent as MovementNominations } from './operations/movement-nominations.svg';
import { ReactComponent as OrderListing } from './operations/order-listings.svg';
import { ReactComponent as ProductMovements } from './operations/product-movements.svg';
import { ReactComponent as SpecialMovements } from './operations/special-movements.svg';
import { ReactComponent as TankerList } from './operations/tanker-list.svg';
import { ReactComponent as TransactionList } from './operations/transaction-list.svg';

const loader = (key) => {
  switch (key) {
    case 'gantry':
      return Gantry;

    case 'dashboard':
      return Dashboard;

    case 'schedules':
      return Schedules;

    case 'reports':
      return Reports;

    case 'accessControl':
      return AccessControl;

    case 'customers':
      return Customers;

    case 'stockManagement':
      return StockManagement;

    case 'printerConfiguration':
      return Printer;

    case 'stockReconciliation':
      return StockManagement;

    case 'operations':
      return Operations;

    case 'user':
      return User;

    case 'au':
      return Australia;

    case 'cn':
      return China;

    case 'en':
      return England;

    case 'tank':
      return Tank;

    case 'list':
      return List;

    case 'create':
      return Create;

    case 'refresh':
      return Refresh;

    case 'export':
      return Export;

    case 'search':
      return Search;

    case 'tanks':
      return Tanks;

    case 'products':
      return Product;

    case 'companies':
      return Office;

    case 'modules':
      return Modules;

    case 'config':
      return Config;

    case 'lock':
      return Lock;

    case 'unlock':
      return Unlock;

    case 'productInventory':
      return ProductInventory;

    case 'selfFuelTransactionList':
      return SelfFuelTransactionList;

    case 'siteBalance':
      return SiteBalance;

    case 'tankInventory':
      return TankInventory;

    case 'tankScreen':
      return TankScreen;

    case 'tankStatus':
      return TankStatus;

    case 'addresses':
      return Addresses;

    case 'allocations':
      return Allocations;

    case 'customerCategories':
      return CustomerCategories;

    case 'customerScreen':
      return CustomerScreen;

    case 'deliveryLocations':
      return DeliveryLocations;

    case 'partners':
      return Partners;

    case 'partnership':
      return Partnership;

    case 'baseProducts':
      return BaseProducts;

    case 'dangerousGoods':
      return DangerousGoods;

    case 'drawerProducts':
      return DrawerProducts;

    case 'hazchemCodes':
      return HazchemCodes;

    case 'productGroups':
      return ProductGroups;

    case 'adaptiveFlowControl':
      return AdaptiveFlowControl;

    case 'bayView':
      return BayView;

    case 'fastTrack':
      return FastTrack;

    case 'fscStatus':
      return FSCStatus;

    case 'tankView':
      return TankView;

    case 'auditingData':
      return AuditingData;

    case 'folioScheduling':
      return FolioScheduling;

    case 'folioSummary':
      return FolioSummary;

    case 'hostMessagingInterface':
      return HostMessagingInterface;

    case 'journal':
      return Journal;

    case 'personnelOnSite':
      return PersonnelOnSite;

    case 'area':
      return Area;

    case 'expiryDates':
      return ExpiryDates;

    case 'idAssignment':
      return IdAssignment;

    case 'personnel':
      return Personnel;

    case 'roleAccessManagement':
      return RoleAccessManagement;

    case 'timeCodes':
      return Timecodes;

    case 'companyBayMovement':
      return CompanyBayMovement;

    case 'keyReaderDevices':
      return KeyReaderDevices;

    case 'loadBays':
      return LoadBays;

    case 'loadMeters':
      return LoadMeters;

    case 'logicalPrinters':
      return LogicalPrinters;

    case 'meterDevices':
      return MeterDevices;

    case 'movementReasons':
      return MovementReasons;

    case 'physicalPrinters':
      return PhysicalPrinters;

    case 'reportConfiguration':
      return ReportConfiguration;

    case 'reportProfile':
      return ReportProfile;

    case 'siteAccessDevices':
      return SiteAccessDevices;

    case 'tankConfiguration':
      return TankConfiguration;

    case 'equipmentList':
      return EquipmentList;

    case 'equipmentTypes':
      return EquipmentTypes;

    case 'gateControl':
      return GateControl;

    case 'inventoryRequests':
      return InventoryRequests;

    case 'loadSchedules':
      return LoadSchedules;

    case 'manualTransactions':
      return ManualTransactions;

    case 'movementNominations':
      return MovementNominations;

    case 'orderListing':
      return OrderListing;

    case 'productMovements':
      return ProductMovements;

    case 'specialMovements':
      return SpecialMovements;

    case 'tankerList':
      return TankerList;

    case 'transactionList':
      return TransactionList;

    case 'unauthorized':
      return Unauthorized;

    default:
      return null;
  }
};

const Icons = (props) => {
  const component = loader(props.type);

  if (props.hidden) {
    return null;
  }

  return (
    <Icon
      component={component}
      {...props}
      style={{
        transform: props.scale ? `'scale(${props.scale})'` : 'scale(1)',
        fontSize: props.size || null,
      }}
    />
  );
};

export default Icons;
