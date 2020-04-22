/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Modal, Badge } from 'antd';
import useSWR from 'swr';
import {
  FireOutlined,
  ClockCircleOutlined,
  MonitorOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
  TeamOutlined,
  ExperimentOutlined,
  PrinterOutlined,
  DeploymentUnitOutlined,
  ClusterOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import { LogoContainer, MenuContainer } from './style';
import { ROUTES } from '../../constants';
import { AUTH } from '../../api';
import Loading from '../loading';

const { confirm } = Modal;
const { SubMenu } = Menu;

const Navigation = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const { isValidating: isLoading } = useSWR(AUTH.PERMISSIONS, { refreshInterval: 0 });

  const handleNavigation = (event) => {
    if (event?.key === ROUTES.LOG_OUT) {
      confirm({
        title: 'Are you sure want to Log Out?',
        icon: <ExclamationCircleOutlined />,
        okText: 'Log Out',
        centered: true,
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: () => history.push(event.key),
      });
    } else {
      history.push(event.key);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MenuContainer>
      <Menu onClick={handleNavigation} defaultSelectedKeys={[ROUTES.DASHBOARD]} theme="dark">
        <LogoContainer>
          <img src="/images/dki_small.png" alt="logo" />
        </LogoContainer>

        <Menu.Item key={ROUTES.DASHBOARD}>
          <FireOutlined />
          <span>{t('pageMenu.dashboard')}</span>
        </Menu.Item>

        <SubMenu
          title={
            <span>
              <ClockCircleOutlined />
              <span>{t('pageMenu.schedules')}</span>
            </span>
          }
        >
          <Menu.Item key={ROUTES.LOAD_SCHEDULES}>
            <Badge status="warning" /> {t('pageNames.loadSchedules')}{' '}
          </Menu.Item>

          <Menu.Item key={ROUTES.EQUIPMENT_LIST}>
            <Badge status="success" /> {t('pageNames.equipmentList')}
          </Menu.Item>

          <Menu.Item key={ROUTES.TANKER_LIST}>
            <Badge status="success" /> {t('pageNames.tankerList')}{' '}
          </Menu.Item>

          <Menu.Item key={ROUTES.TRANSACTION_LIST}>
            <Badge status="warning" /> {t('pageNames.transactionList')}
          </Menu.Item>

          <Menu.Item key={ROUTES.SELF_FUEL_TRANSACTION_LIST}>
            <Badge status="warning" /> {t('pageNames.selfFuelTransactionList')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <span>
              <MonitorOutlined />
              <span>{t('pageMenu.gantry')}</span>
            </span>
          }
        >
          <Menu.Item key={ROUTES.LOAD_BAYS}>
            <Badge status="error" /> {t('pageNames.loadBays')}
          </Menu.Item>

          <Menu.Item key={ROUTES.COMPANIES}>
            <Badge status="warning" /> {t('pageNames.companies')}
          </Menu.Item>

          <Menu.Item key={ROUTES.TANK_GROUPS}>
            <Badge status="error" /> {t('pageNames.tankGroups')}
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
            <Badge status="error" /> {t('pageNames.productGroups')}
          </Menu.Item>

          <Menu.Item key={ROUTES.ALLOCATIONS}>
            <Badge status="warning" /> {t('pageNames.allocations')}
          </Menu.Item>

          <Menu.Item key={ROUTES.HAZCHEM_CODES}>
            <Badge status="success" /> {t('pageNames.hazchemCodes')}
          </Menu.Item>

          <Menu.Item key={ROUTES.LOAD_METERS}>
            <Badge status="error" /> {t('pageNames.loadMeters')}
          </Menu.Item>

          <Menu.Item key={ROUTES.COMPANY_BAY_MOVEMENT}>
            <Badge status="warning" /> {t('pageNames.companyBayMovement')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <span>
              <FileDoneOutlined />
              <span>{t('pageMenu.reports')}</span>
            </span>
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
            <Badge status="error" /> {t('pageNames.auditingData')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <span>
              <FileProtectOutlined />
              <span>{t('pageMenu.accessControl')}</span>
            </span>
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
            <span>
              <TeamOutlined />
              <span>{t('pageMenu.customers')}</span>
            </span>
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
          <Menu.Item key={ROUTES.PRICE_OFFSETS}>
            <Badge status="error" /> {t('pageNames.priceOffsets')}
          </Menu.Item>
          <Menu.Item key={ROUTES.CUSTOMER_PRICING}>
            <Badge status="error" /> {t('pageNames.customerPricing')}
          </Menu.Item>
          <Menu.Item key={ROUTES.ORDER_PRODUCT_PRICING}>
            <Badge status="error" /> {t('pageNames.orderProductPricing')}
          </Menu.Item>
          <Menu.Item key={ROUTES.PARTNERS}>
            <Badge status="error" /> {t('pageNames.partners')}
          </Menu.Item>
          <Menu.Item key={ROUTES.PARTNERSHIP}>
            <Badge status="error" /> {t('pageNames.partnership')}
          </Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <span>
              <ExperimentOutlined />
              <span>{t('pageMenu.stockManagement')}</span>
            </span>
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
            <Badge status="error" /> {t('pageNames.tankStatus')}
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
          title={
            <span>
              <PrinterOutlined />
              <span>{t('pageMenu.printerConfiguration')}</span>
            </span>
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
            <span>
              <DeploymentUnitOutlined />
              <span>{t('pageMenu.stockReconciliation')}</span>
            </span>
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
            <span>
              <ClusterOutlined />
              <span>{t('pageMenu.operations')}</span>
            </span>
          }
        >
          <Menu.Item key={ROUTES.TANK_VIEW}>
            <Badge status="warning" />
            {t('pageNames.tankView')}
          </Menu.Item>

          <Menu.Item key={ROUTES.BAY_VIEW}>
            <Badge status="error" />
            {t('pageNames.bayView')}
          </Menu.Item>

          <Menu.Item key={ROUTES.DRAWER_PRODUCT_ASSETS}>
            <Badge status="error" />
            {t('pageNames.drawerProductAssets')}
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

        <SubMenu
          title={
            <span>
              <UserOutlined />
              <span>{t('pageMenu.user')}</span>
            </span>
          }
        >
          <Menu.Item key={ROUTES.USER_PROFILE}>
            <Badge status="error" />
            {t('pageNames.profile')}
          </Menu.Item>

          <Menu.Item key={ROUTES.SITE_CONFIGURATION}>
            <Badge status="error" />
            {t('pageNames.siteConfiguration')}
          </Menu.Item>

          <Menu.Item key={ROUTES.LOG_OUT}>
            <Badge status="success" />
            {t('pageNames.logOut')}
          </Menu.Item>
        </SubMenu>
      </Menu>
    </MenuContainer>
  );
};

export default Navigation;
