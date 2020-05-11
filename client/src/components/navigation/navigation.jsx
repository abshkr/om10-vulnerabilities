/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Badge, Tooltip } from 'antd';
import useSWR from 'swr';

import { LogoContainer, MenuContainer } from './style';
import { ROUTES, SETTINGS } from '../../constants';
import { AUTH } from '../../api';
import { Icons, Loading } from '..';

const { SubMenu } = Menu;

const Navigation = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const { isValidating: isLoading } = useSWR(AUTH.PERMISSIONS, { refreshInterval: 0 });

  const handleNavigation = (event) => {
    history.push(event.key);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MenuContainer>
      <Menu onClick={handleNavigation} defaultSelectedKeys={[ROUTES.HOME]} theme="dark">
        <LogoContainer>
          <Tooltip
            placement="right"
            title={`${t('generic.version')} ${SETTINGS.VERSION}`}
            align={{ offset: [28, 0] }}
          >
            <img src="/images/dki_small.png" alt="logo" />
          </Tooltip>
        </LogoContainer>

        <Menu.Item key={ROUTES.HOME}>
          <Icons type="dashboard" />
          <span>{t('pageMenu.dashboard')}</span>
        </Menu.Item>

        <SubMenu
          title={
            <>
              <Icons type="schedules" />
              <span>{t('pageMenu.schedules')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.LOAD_SCHEDULES}>
            <Badge status="warning" /> {t('pageNames.loadSchedules')}{' '}
          </Menu.Item>

          <Menu.Item key={ROUTES.EQUIPMENT_LIST}>
            <Badge status="success" /> {t('pageNames.equipmentList')}
          </Menu.Item>

          <Menu.Item key={ROUTES.EQUIPMENT_TYPES}>
            <Badge status="error" /> {t('pageNames.equipmentTypes')}
          </Menu.Item>

          <Menu.Item key={ROUTES.TANKER_LIST}>
            <Badge status="success" /> {t('pageNames.tankerList')}{' '}
          </Menu.Item>

          <Menu.Item key={ROUTES.TRANSACTION_LIST}>
            <Badge status="success" /> {t('pageNames.transactionList')}
          </Menu.Item>

          <Menu.Item key={ROUTES.SELF_FUEL_TRANSACTION_LIST}>
            <Badge status="success" /> {t('pageNames.selfFuelTransactionList')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="gantry" />
              <span>{t('pageMenu.gantry')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.LOAD_BAYS}>
            <Badge status="error" /> {t('pageNames.loadBays')}
          </Menu.Item>

          <Menu.Item key={ROUTES.COMPANIES}>
            <Badge status="warning" /> {t('pageNames.companies')}
          </Menu.Item>

          <Menu.Item key={ROUTES.TANK_GROUPS}>
            <Badge status="warning" /> {t('pageNames.tankGroups')}
          </Menu.Item>

          <Menu.Item key={ROUTES.BASE_PRODUCTS}>
            <Badge status="success" /> {t('pageNames.baseProducts')}
          </Menu.Item>

          <Menu.Item key={ROUTES.DRAWER_PRODUCTS}>
            <Badge status="error" /> {t('pageNames.drawerProducts')}
          </Menu.Item>

          <Menu.Item key={ROUTES.TANK_CONFIGURATION}>
            <Badge status="success" /> {t('pageNames.tankConfiguration')}
          </Menu.Item>

          <Menu.Item key={ROUTES.PRODUCT_GROUPS}>
            <Badge status="success" /> {t('pageNames.productGroups')}
          </Menu.Item>

          <Menu.Item key={ROUTES.ALLOCATIONS}>
            <Badge status="warning" /> {t('pageNames.allocations')}
          </Menu.Item>

          <Menu.Item key={ROUTES.HAZCHEM_CODES}>
            <Badge status="success" /> {t('pageNames.hazchemCodes')}
          </Menu.Item>

          <Menu.Item key={ROUTES.LOAD_METERS}>
            <Badge status="success" /> {t('pageNames.loadMeters')}
          </Menu.Item>

          <Menu.Item key={ROUTES.COMPANY_BAY_MOVEMENT}>
            <Badge status="success" /> {t('pageNames.companyBayMovement')}
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
          <Menu.Item key={ROUTES.JOURNAL}>
            <Badge status="success" /> {t('pageNames.journal')}
          </Menu.Item>
          <Menu.Item key={ROUTES.REPORT_PROFILE}>
            <Badge status="success" /> {t('pageNames.reportProfile')}
          </Menu.Item>
          <Menu.Item key={ROUTES.ON_DEMAND_REPORTS}>
            <Badge status="success" /> {t('pageNames.onDemandReports')}
          </Menu.Item>
          <Menu.Item key={ROUTES.REPORT_CONFIGURATION}>
            <Badge status="success" /> {t('pageNames.reportConfiguration')}
          </Menu.Item>
          <Menu.Item key={ROUTES.PERSONNEL_ON_SITE}>
            <Badge status="success" /> {t('pageNames.personnelOnSite')}
          </Menu.Item>
          <Menu.Item key={ROUTES.FOLIO_SUMMARY}>
            <Badge status="success" /> {t('pageNames.folioSummary')}
          </Menu.Item>
          <Menu.Item key={ROUTES.FOLIO_SCHEDULLING}>
            <Badge status="error" /> {t('pageNames.folioScheduling')}
          </Menu.Item>
          <Menu.Item key={ROUTES.HOST_MESSAGING_INTERFACE}>
            <Badge status="error" /> {t('pageNames.hostMessagingInterface')}
          </Menu.Item>
          <Menu.Item key={ROUTES.AUDITING_DATA}>
            <Badge status="success" /> {t('pageNames.auditingData')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="accessControl" />
              <span>{t('pageMenu.accessControl')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.ID_ASSIGNMENT}>
            <Badge status="success" /> {t('pageNames.idAssignment')}
          </Menu.Item>
          <Menu.Item key={ROUTES.PERSONNEL}>
            <Badge status="success" /> {t('pageNames.personnel')}
          </Menu.Item>
          <Menu.Item key={ROUTES.ROLE_ACCESS_MANAGEMENT}>
            <Badge status="success" /> {t('pageNames.roleAccessManagement')}
          </Menu.Item>
          <Menu.Item key={ROUTES.EXPIRY_DATES}>
            <Badge status="success" /> {t('pageNames.expiryDates')}
          </Menu.Item>
          <Menu.Item key={ROUTES.AREA}>
            <Badge status="warning" /> {t('pageNames.area')}
          </Menu.Item>
          <Menu.Item key={ROUTES.SITE_ACCESS_DEVICES}>
            <Badge status="success" /> {t('pageNames.siteAccessDevices')}
          </Menu.Item>

          <Menu.Item key={ROUTES.KEY_READER_DEVICES}>
            <Badge status="success" /> {t('pageNames.keyReaderDevices')}
          </Menu.Item>

          <Menu.Item key={ROUTES.GATE_PERMISSION}>
            <Badge status="warning" /> {t('pageNames.gatePermission')}
          </Menu.Item>
          <Menu.Item key={ROUTES.GATE_CONTROL}>
            <Badge status="success" /> {t('pageNames.gateControl')}
          </Menu.Item>
          <Menu.Item key={ROUTES.TIME_CODES}>
            <Badge status="warning" /> {t('pageNames.timeCodes')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="customers" />
              <span>{t('pageMenu.customers')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.CUSTOMERS}>
            <Badge status="warning" /> {t('pageNames.customers')}
          </Menu.Item>
          <Menu.Item key={ROUTES.ORDER_LISTING}>
            <Badge status="error" /> {t('pageNames.orderListing')}
          </Menu.Item>
          <Menu.Item key={ROUTES.ADDRESSES}>
            <Badge status="error" /> {t('pageNames.addresses')}
          </Menu.Item>
          <Menu.Item key={ROUTES.CUSTOMER_CATEGORIES}>
            <Badge status="success" /> {t('pageNames.customerCategories')}
          </Menu.Item>
          <Menu.Item key={ROUTES.DELIVERY_LOCATIONS}>
            <Badge status="error" /> {t('pageNames.deliveryLocations')}
          </Menu.Item>
          <Menu.Item key={ROUTES.PARTNERS}>
            <Badge status="success" /> {t('pageNames.partners')}
          </Menu.Item>
          <Menu.Item key={ROUTES.PARTNERSHIP}>
            <Badge status="warning" /> {t('pageNames.partnership')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="stockManagement" />
              <span>{t('pageMenu.stockManagement')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.METERING}>
            <Badge status="success" /> {t('pageNames.metering')}
          </Menu.Item>
          <Menu.Item key={ROUTES.SITE_BALANCE}>
            <Badge status="success" /> {t('pageNames.siteBalance')}
          </Menu.Item>
          <Menu.Item key={ROUTES.TANK_INVENTORY}>
            <Badge status="success" /> {t('pageNames.tankInventory')}
          </Menu.Item>
          <Menu.Item key={ROUTES.PRODUCT_INVENTORY}>
            <Badge status="success" /> {t('pageNames.productInventory')}
          </Menu.Item>

          <Menu.Item key={ROUTES.TANK_STATUS}>
            <Badge status="success" /> {t('pageNames.tankStatus')}
          </Menu.Item>

          <Menu.Item key={ROUTES.TANK_STRAPPING}>
            <Badge status="success" /> {t('pageNames.tankStrapping')}
          </Menu.Item>

          <Menu.Item key={ROUTES.PRODUCT_MOVEMENTS}>
            <Badge status="success" /> {t('pageNames.productMovements')}
          </Menu.Item>
          <Menu.Item key={ROUTES.INVENTORY_REQUESTS}>
            <Badge status="success" /> {t('pageNames.inventoryRequests')}
          </Menu.Item>
          <Menu.Item key={ROUTES.METER_DEVICES}>
            <Badge status="success" /> {t('pageNames.meterDevices')}{' '}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key={ROUTES.PRINTER_CONFIGURATION}
          title={
            <>
              <Icons type="printerConfiguration" />
              <span>{t('pageMenu.printerConfiguration')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.PHYSICAL_PRINTERS}>
            <Badge status="success" /> {t('pageNames.physicalPrinters')}
          </Menu.Item>

          <Menu.Item key={ROUTES.LOGICAL_PRINTERS}>
            <Badge status="success" /> {t('pageNames.logicalPrinters')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="stockReconciliation" />
              <span>{t('pageMenu.stockReconciliation')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.MOVEMENT_NOMINATIONS}>
            <Badge status="warning" />
            {t('pageNames.movementNominations')}
          </Menu.Item>

          <Menu.Item key={ROUTES.MOVEMENT_REASONS}>
            <Badge status="success" />
            {t('pageNames.movementReasons')}
          </Menu.Item>

          <Menu.Item key={ROUTES.MANUAL_TRANSACTIONS}>
            <Badge status="warning" />
            {t('pageNames.manualTransactions')}
          </Menu.Item>

          <Menu.Item key={ROUTES.SPECIAL_MOVEMENTS}>
            <Badge status="success" />
            {t('pageNames.specialMovements')}{' '}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="operations" />
              <span>{t('pageMenu.operations')}</span>
            </>
          }
        >
          <Menu.Item key={ROUTES.TANK_VIEW}>
            <Badge status="warning" />
            {t('pageNames.tankView')}
          </Menu.Item>

          <Menu.Item key={ROUTES.BAY_VIEW}>
            <Badge status="success" />
            {t('pageNames.bayView')}
          </Menu.Item>

          <Menu.Item key={ROUTES.ADAPTIVE_FLOW_CONTROL}>
            <Badge status="success" />
            {t('pageNames.adaptiveFlowControl')}
          </Menu.Item>

          <Menu.Item key={ROUTES.FSC_STATUS}>
            <Badge status="success" />
            {t('pageNames.fscStatus')}
          </Menu.Item>
        </SubMenu>
      </Menu>
    </MenuContainer>
  );
};

export default Navigation;
