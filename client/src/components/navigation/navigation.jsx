/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Badge, Tooltip } from 'antd';

import { LogoContainer, MenuContainer } from './style';
import { ROUTES, SETTINGS } from '../../constants';

import { Icons } from '..';

const { SubMenu } = Menu;

const Navigation = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [active, setActive] = useState([ROUTES.HOME]);

  const handleNavigation = (event) => {
    setActive([[event.key]]);

    history.push(event.key);
  };

  return (
    <MenuContainer>
      <Menu onClick={handleNavigation} defaultSelectedKeys={active} style={{ width: '100%' }} theme="dark">
        <LogoContainer>
          <Tooltip
            placement="right"
            title={`${t('generic.version')} ${SETTINGS.VERSION}`}
            align={{ offset: [28, 0] }}
          >
            <img src="/images/dki_small.png" alt="logo" style={{ height: 300 }} />
          </Tooltip>
        </LogoContainer>

        <Menu.Item key={ROUTES.HOME}>
          <Icons type="dashboard" />
          <span>{t('pageMenu.dashboard')}</span>
        </Menu.Item>

        <SubMenu
          title={
            <>
              <Icons type="operations" />
              <span>{t('pageMenu.operations')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.LOAD_SCHEDULES} style={{ display: 'flex', marginTop: 10 }}>
            <Icons size={40} type="loadSchedules" /> {t('pageNames.loadSchedules')}
          </Menu.Item>

          <Menu.Item key={ROUTES.ORDER_LISTING} style={{ display: 'flex' }}>
            <Icons size={40} type="orderListing" /> {t('pageNames.orderListing')}
          </Menu.Item>

          <Menu.Item key={ROUTES.TRANSACTION_LIST} style={{ display: 'flex' }}>
            <Icons size={40} type="transactionList" /> {t('pageNames.transactionList')}
          </Menu.Item>

          <Menu.Item key={ROUTES.MOVEMENT_NOMINATIONS} style={{ display: 'flex' }}>
            <Icons size={40} type="movementNominations" />
            {t('pageNames.movementNominations')}
          </Menu.Item>

          <Menu.Item key={ROUTES.SPECIAL_MOVEMENTS} style={{ display: 'flex' }}>
            <Icons size={40} type="specialMovements" />
            {t('pageNames.specialMovements')}
          </Menu.Item>

          <Menu.Item key={ROUTES.MANUAL_TRANSACTIONS} style={{ display: 'flex' }}>
            <Icons size={40} type="manualTransactions" />
            {t('pageNames.manualTransactions')}
          </Menu.Item>

          <Menu.Item key={ROUTES.PRODUCT_MOVEMENTS} style={{ display: 'flex' }}>
            <Icons size={40} type="productMovements" />
            {t('pageNames.productMovements')}
          </Menu.Item>

          <Menu.Item key={ROUTES.INVENTORY_REQUESTS} style={{ display: 'flex' }}>
            <Icons size={40} type="inventoryRequests" />
            {t('pageNames.inventoryRequests')}
          </Menu.Item>

          <Menu.Item key={ROUTES.GATE_CONTROL} style={{ display: 'flex' }}>
            <Icons size={40} type="gateControl" />
            {t('pageNames.gateControl')}
          </Menu.Item>

          <Menu.Item key={ROUTES.EQUIPMENT_TYPES} style={{ display: 'flex' }}>
            <Icons size={40} type="equipmentTypes" />
            {t('pageNames.equipmentTypes')}
          </Menu.Item>

          <Menu.Item key={ROUTES.EQUIPMENT_LIST} style={{ display: 'flex' }}>
            <Icons size={40} type="equipmentList" />
            {t('pageNames.equipmentList')}
          </Menu.Item>

          <Menu.Item key={ROUTES.TANKER_LIST} style={{ display: 'flex', marginBottom: 10 }}>
            <Icons size={40} type="tankerList" />
            {t('pageNames.tankerList')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="stockManagement" />
              <span>{t('pageMenu.stock')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.TANKS} style={{ display: 'flex', marginTop: 10 }}>
            <Icons size={40} type="tankScreen" />
            {t('pageNames.tanks')}
          </Menu.Item>

          <Menu.Item key={ROUTES.TANK_GROUPS} style={{ display: 'flex' }}>
            <Icons size={40} type="tankGroups" />
            {t('pageNames.tankGroups')}
          </Menu.Item>

          <Menu.Item key={ROUTES.SITE_BALANCE} style={{ display: 'flex' }}>
            <Icons size={40} type="siteBalance" />
            {t('pageNames.siteBalance')}
          </Menu.Item>

          <Menu.Item key={ROUTES.TANK_INVENTORY} style={{ display: 'flex' }}>
            <Icons size={40} type="tankInventory" />
            {t('pageNames.tankInventory')}
          </Menu.Item>

          <Menu.Item key={ROUTES.PRODUCT_INVENTORY} style={{ display: 'flex' }}>
            <Icons size={40} type="productInventory" />
            <span>{t('pageNames.productInventory')}</span>
          </Menu.Item>

          <Menu.Item key={ROUTES.TANK_STATUS} style={{ display: 'flex' }}>
            <Icons size={40} type="tankStatus" />
            {t('pageNames.tankStatus')}
          </Menu.Item>

          <Menu.Item key={ROUTES.SELF_FUEL_TRANSACTION_LIST} style={{ display: 'flex', marginBottom: 10 }}>
            <Icons size={40} type="selfFuelTransactionList" />
            {t('pageNames.selfFuelTransactionList')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="reports" />
              <span>{t('pageMenu.reports')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.FOLIO_SUMMARY} style={{ display: 'flex', marginTop: 10 }}>
            <Icons size={40} type="folioSummary" /> {t('pageNames.folioSummary')}
          </Menu.Item>

          <Menu.Item key={ROUTES.ON_DEMAND_REPORTS} style={{ display: 'flex' }}>
            <Icons size={40} type="onDemandReports" /> {t('pageNames.onDemandReports')}
          </Menu.Item>

          <Menu.Item key={ROUTES.JOURNAL} style={{ display: 'flex' }}>
            <Icons size={40} type="journal" /> {t('pageNames.journal')}
          </Menu.Item>

          <Menu.Item key={ROUTES.HOST_MESSAGING_INTERFACE} style={{ display: 'flex' }}>
            <Icons size={40} type="hostMessagingInterface" /> {t('pageNames.hostMessagingInterface')}
          </Menu.Item>

          <Menu.Item key={ROUTES.PERSONNEL_ON_SITE} style={{ display: 'flex' }}>
            <Icons size={40} type="personnelOnSite" /> {t('pageNames.personnelOnSite')}
          </Menu.Item>

          <Menu.Item key={ROUTES.AUDITING_DATA} style={{ display: 'flex' }}>
            <Icons size={40} type="auditingData" /> {t('pageNames.auditingData')}
          </Menu.Item>

          <Menu.Item key={ROUTES.METERING} style={{ display: 'flex', marginBottom: 10 }}>
            <Icons size={40} type="metering" /> {t('pageNames.metering')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="accessControl" />
              <span>{t('pageMenu.security')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.PERSONNEL} style={{ display: 'flex', marginTop: 10 }}>
            <Icons size={40} type="personnel" /> {t('pageNames.personnel')}
          </Menu.Item>

          <Menu.Item key={ROUTES.ID_ASSIGNMENT} style={{ display: 'flex' }}>
            <Icons size={40} type="idAssignment" /> {t('pageNames.idAssignment')}
          </Menu.Item>

          <Menu.Item key={ROUTES.EXPIRY_DATES} style={{ display: 'flex' }}>
            <Icons size={40} type="expiryDates" /> {t('pageNames.expiryDates')}
          </Menu.Item>

          <Menu.Item key={ROUTES.TIME_CODES} style={{ display: 'flex' }}>
            <Icons size={40} type="timeCodes" /> {t('pageNames.timeCodes')}
          </Menu.Item>

          <Menu.Item key={ROUTES.ROLE_ACCESS_MANAGEMENT} style={{ display: 'flex' }}>
            <Icons size={40} type="roleAccessManagement" /> {t('pageNames.roleAccessManagement')}
          </Menu.Item>

          <Menu.Item key={ROUTES.AREA} style={{ display: 'flex' }}>
            <Icons size={40} type="area" /> {t('pageNames.area')}
          </Menu.Item>

          <Menu.Item key={ROUTES.GATE_PERMISSION} style={{ display: 'flex', marginBottom: 10 }}>
            <Icons size={40} type="gatePermission" /> {t('pageNames.gatePermission')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="products" />
              <span>{t('pageMenu.products')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.BASE_PRODUCTS} style={{ display: 'flex', marginTop: 10 }}>
            <Icons size={40} type="baseProducts" /> {t('pageNames.baseProducts')}
          </Menu.Item>

          <Menu.Item key={ROUTES.DRAWER_PRODUCTS} style={{ display: 'flex' }}>
            <Icons size={40} type="drawerProducts" /> {t('pageNames.drawerProducts')}
          </Menu.Item>

          <Menu.Item key={ROUTES.HAZCHEM_CODES} style={{ display: 'flex' }}>
            <Icons size={40} type="hazchemCodes" /> {t('pageNames.hazchemCodes')}
          </Menu.Item>

          <Menu.Item key={ROUTES.DANGEROUS_GOODS} style={{ display: 'flex' }}>
            <Icons size={40} type="dangerousGoods" /> {t('pageNames.dangerousGoods')}
          </Menu.Item>

          <Menu.Item key={ROUTES.PRODUCT_GROUPS} style={{ display: 'flex', marginBottom: 10 }}>
            <Icons size={40} type="productGroups" /> {t('pageNames.productGroups')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="companies" />
              <span>{t('pageMenu.companies')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.COMPANIES} style={{ display: 'flex', marginTop: 10 }}>
            <Icons size={40} type="companies" />
            {t('pageNames.companies')}
          </Menu.Item>

          <Menu.Item key={ROUTES.ALLOCATIONS} style={{ display: 'flex' }}>
            <Icons size={40} type="allocations" />
            {t('pageNames.allocations')}
          </Menu.Item>

          <Menu.Item key={ROUTES.CUSTOMERS} style={{ display: 'flex' }}>
            <Icons size={40} type="customerScreen" />
            {t('pageNames.customers')}
          </Menu.Item>

          <Menu.Item key={ROUTES.ADDRESSES} style={{ display: 'flex' }}>
            <Icons size={40} type="addresses" />
            {t('pageNames.addresses')}
          </Menu.Item>

          <Menu.Item key={ROUTES.DELIVERY_LOCATIONS} style={{ display: 'flex' }}>
            <Icons size={40} type="deliveryLocations" />
            {t('pageNames.deliveryLocations')}
          </Menu.Item>

          <Menu.Item key={ROUTES.PARTNERS} style={{ display: 'flex' }}>
            <Icons size={40} type="partners" />
            {t('pageNames.partners')}
          </Menu.Item>

          <Menu.Item key={ROUTES.PARTNERSHIP} style={{ display: 'flex' }}>
            <Icons size={40} type="partnership" />
            {t('pageNames.partnership')}
          </Menu.Item>

          <Menu.Item key={ROUTES.CUSTOMER_CATEGORIES} style={{ display: 'flex', marginBottom: 10 }}>
            <Icons size={40} type="customerCategories" />
            {t('pageNames.customerCategories')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="config" />
              <span>{t('pageMenu.config')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.LOAD_BAYS} style={{ display: 'flex', marginTop: 10 }}>
            <Icons size={40} type="loadBays" />
            {t('pageNames.loadBays')}
          </Menu.Item>

          <Menu.Item key={ROUTES.COMPANY_BAY_MOVEMENT} style={{ display: 'flex' }}>
            <Icons size={40} type="companyBayMovement" />
            {t('pageNames.companyBayMovement')}
          </Menu.Item>

          <Menu.Item key={ROUTES.LOAD_METERS} style={{ display: 'flex' }}>
            <Icons size={40} type="loadMeters" />
            {t('pageNames.loadMeters')}
          </Menu.Item>

          <Menu.Item key={ROUTES.METER_DEVICES} style={{ display: 'flex' }}>
            <Icons size={40} type="meterDevices" />
            {t('pageNames.meterDevices')}
          </Menu.Item>

          <Menu.Item key={ROUTES.PHYSICAL_PRINTERS} style={{ display: 'flex' }}>
            <Icons size={40} type="physicalPrinters" /> {t('pageNames.physicalPrinters')}
          </Menu.Item>

          <Menu.Item key={ROUTES.SITE_ACCESS_DEVICES} style={{ display: 'flex' }}>
            <Icons size={40} type="siteAccessDevices" /> {t('pageNames.siteAccessDevices')}
          </Menu.Item>

          <Menu.Item key={ROUTES.KEY_READER_DEVICES} style={{ display: 'flex' }}>
            <Icons size={40} type="keyReaderDevices" /> {t('pageNames.keyReaderDevices')}
          </Menu.Item>

          <Menu.Item key={ROUTES.TANK_CONFIGURATION} style={{ display: 'flex' }}>
            <Icons size={40} type="tankConfiguration" /> {t('pageNames.tankConfiguration')}
          </Menu.Item>

          <Menu.Item key={ROUTES.LOGICAL_PRINTERS} style={{ display: 'flex' }}>
            <Icons size={40} type="logicalPrinters" /> {t('pageNames.logicalPrinters')}
          </Menu.Item>

          <Menu.Item key={ROUTES.REPORT_CONFIGURATION} style={{ display: 'flex' }}>
            <Icons size={40} type="reportConfiguration" /> {t('pageNames.reportConfiguration')}
          </Menu.Item>

          <Menu.Item key={ROUTES.REPORT_PROFILE} style={{ display: 'flex' }}>
            <Icons size={40} type="reportProfile" /> {t('pageNames.reportProfile')}
          </Menu.Item>

          <Menu.Item key={ROUTES.FOLIO_SCHEDULLING} style={{ display: 'flex' }}>
            <Icons size={40} type="folioScheduling" /> {t('pageNames.folioScheduling')}
          </Menu.Item>

          <Menu.Item key={ROUTES.MOVEMENT_REASONS} style={{ display: 'flex', marginBottom: 10 }}>
            <Icons size={40} type="movementReasons" /> {t('pageNames.movementReasons')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="modules" />
              <span>{t('pageMenu.modules')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.BAY_VIEW} style={{ display: 'flex', marginTop: 10 }}>
            <Icons size={40} type="bayView" />
            {t('pageNames.bayView')}
          </Menu.Item>

          <Menu.Item key={ROUTES.ADAPTIVE_FLOW_CONTROL} style={{ display: 'flex' }}>
            <Icons size={40} type="adaptiveFlowControl" />
            {t('pageNames.adaptiveFlowControl')}
          </Menu.Item>

          <Menu.Item key={ROUTES.FSC_STATUS} style={{ display: 'flex', marginBottom: 10 }}>
            <Icons size={40} type="fscStatus" />
            {t('pageNames.fscStatus')}
          </Menu.Item>
        </SubMenu>
      </Menu>
    </MenuContainer>
  );
};

export default Navigation;
