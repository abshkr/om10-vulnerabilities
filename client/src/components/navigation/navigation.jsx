/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Tooltip, notification } from 'antd';

import { LogoContainer, MenuContainer } from './style';
import { ROUTES, SETTINGS } from '../../constants';
import { useConfig } from '../../hooks';

import { Icons } from '..';
import { AUTH } from 'api';
import api from 'api';
import useSWR from 'swr';
import _ from 'lodash';

const { SubMenu } = Menu;

const Navigation = () => {
  // const { data: payload, isValidating } = useSWR(AUTH.MODULES);
  // console.log(payload?.records)

  const { t } = useTranslation();
  const history = useHistory();
  const config = useConfig();

  const [active, setActive] = useState([ROUTES.HOME]);
  const [modules, setmodules] = useState([]);
  // const modules = {};

  const handleNavigation = (event) => {
    setActive([[event.key]]);

    if (event?.key === ROUTES.TANK_STATUS) {
      history.push(ROUTES.TANKS, {
        listed: true,
      });
    } else if (event?.key === ROUTES.BAY_VIEW) {
      // const access = useAuth('M_BAYVIEW'); //Cannot use useAuth here because this is a function not a component
      api.get(`${AUTH.PERMISSIONS}?object_text=M_BAYVIEW`).then((res) => {
        if (!res.data.records[0].priv_view) {
          console.log('Do not have view privilege');
          history.push(ROUTES.UNAUTHORIZED);
        } else {
          const port = window.location.port ? window.location.port : 443;
          api
            .get(`https://${window.location.hostname}:${port}/scadaviews/bayview/index.html`)
            .then((res) => {
              if (res.data.includes('<title>OMEGA 5000</title>')) {
                history.push(ROUTES.BAY_VIEW);
              } else {
                window.open(
                  `https://${window.location.hostname}:${port}/scadaviews/bayview/index.html`,
                  '_blank'
                );
              }
            })
            .catch(function (error) {
              history.push(ROUTES.BAY_VIEW);
            });
        }
      });
    } else {
      history.push(event.key);
    }
  };

  //Middle click to open on a new tab. Use newscreen because cannot find a better way
  const onMouseDown = (event) => {
    if (event.button === 1) {
      event.target.getAttribute('newscreen') &&
        window.open(window.location.origin + event.target.getAttribute('newscreen'), '_blank');
      // event.preventDefault();
    }
  };

  // if (_.filter(payload?.records))

  useEffect(() => {
    api
      .get(AUTH.MODULES)
      .then((res) => {
        // console.log("[After retrieve]");
        const menuItems = res.data.records;
        const mod = {};
        for (let i = 0; i < menuItems.length; i++) {
          mod[menuItems[i].object_text] = menuItems[i].domain_object_active;
        }
        // console.log(mod);
        setmodules(mod);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
        console.log(errors);
      });
  }, []);

  // console.log(modules);

  return (
    <MenuContainer>
      <Menu
        onMouseDown={onMouseDown}
        onClick={handleNavigation}
        defaultSelectedKeys={active}
        style={{ width: '100%' }}
        theme="dark"
      >
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
          <Menu.Item key="operations" disabled>
            <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.operations')}</div>
          </Menu.Item>

          {modules?.M_LOADSCHEDULES && (
            <Menu.Item
              key={ROUTES.LOAD_SCHEDULES}
              style={{ display: 'flex', marginTop: 10 }}
              newscreen={ROUTES.LOAD_SCHEDULES}
            >
              <Icons size={40} hidden type="loadSchedules" /> {t('pageNames.loadSchedules')}
            </Menu.Item>
          )}

          {modules?.M_ORDERLISTING && (
            <Menu.Item
              key={ROUTES.ORDER_LISTING}
              style={{ display: 'flex' }}
              newscreen={ROUTES.ORDER_LISTING}
            >
              <Icons size={40} hidden type="orderListing" /> {t('pageNames.orderListing')}
            </Menu.Item>
          )}

          {modules?.M_TRANSACTIONLIST && (
            <Menu.Item
              key={ROUTES.TRANSACTION_LIST}
              style={{ display: 'flex' }}
              newscreen={ROUTES.TRANSACTION_LIST}
            >
              <Icons size={40} hidden type="transactionList" /> {t('pageNames.transactionList')}
            </Menu.Item>
          )}

          {modules?.M_NOMINATION && (
            <Menu.Item
              key={ROUTES.MOVEMENT_NOMINATIONS}
              style={{ display: 'flex' }}
              newscreen={ROUTES.MOVEMENT_NOMINATIONS}
            >
              <Icons size={40} hidden type="movementNominations" />
              {t('pageNames.movementNominations')}
            </Menu.Item>
          )}

          {modules?.M_SPECIALMOVEMENTS && (
            <Menu.Item
              key={ROUTES.SPECIAL_MOVEMENTS}
              style={{ display: 'flex' }}
              newscreen={ROUTES.SPECIAL_MOVEMENTS}
            >
              <Icons size={40} hidden type="specialMovements" />
              {t('pageNames.specialMovements')}
            </Menu.Item>
          )}

          {modules?.M_MANUALTRANSACTIONS && (
            <Menu.Item
              key={ROUTES.MANUAL_TRANSACTIONS}
              style={{ display: 'flex' }}
              newscreen={ROUTES.MANUAL_TRANSACTIONS}
            >
              <Icons size={40} hidden type="manualTransactions" />
              {t('pageNames.manualTransactions')}
            </Menu.Item>
          )}

          {modules?.M_PRODUCTMOVEMENT && (
            <Menu.Item
              key={ROUTES.PRODUCT_MOVEMENTS}
              style={{ display: 'flex' }}
              newscreen={ROUTES.PRODUCT_MOVEMENTS}
            >
              <Icons size={40} hidden type="productMovements" />
              {t('pageNames.productMovements')}
            </Menu.Item>
          )}

          {modules?.M_INVENTORYREQUEST && (
            <Menu.Item
              key={ROUTES.INVENTORY_REQUESTS}
              style={{ display: 'flex' }}
              newscreen={ROUTES.INVENTORY_REQUESTS}
            >
              <Icons size={40} hidden type="inventoryRequests" />
              {t('pageNames.inventoryRequests')}
            </Menu.Item>
          )}

          {modules?.M_GATECONTROL && (
            <Menu.Item key={ROUTES.GATE_CONTROL} style={{ display: 'flex' }} newscreen={ROUTES.GATE_CONTROL}>
              <Icons size={40} hidden type="gateControl" />
              {t('pageNames.gateControl')}
            </Menu.Item>
          )}

          {modules?.M_EQUIPMENT && (
            <Menu.Item
              key={ROUTES.EQUIPMENT_TYPES}
              style={{ display: 'flex' }}
              newscreen={ROUTES.EQUIPMENT_TYPES}
            >
              <Icons size={40} hidden type="equipmentTypes" />
              {t(config?.siteLabelUser + 'pageNames.equipmentTypes')}
            </Menu.Item>
          )}

          {modules?.M_EQUIPMENTLIST && (
            <Menu.Item
              key={ROUTES.EQUIPMENT_LIST}
              style={{ display: 'flex' }}
              newscreen={ROUTES.EQUIPMENT_LIST}
            >
              <Icons size={40} hidden type="equipmentList" />
              {t(config?.siteLabelUser + 'pageNames.equipmentList')}
            </Menu.Item>
          )}

          {modules?.M_TANKERS && (
            <Menu.Item
              key={ROUTES.TANKER_LIST}
              style={{ display: 'flex', marginBottom: 10 }}
              newscreen={ROUTES.TANKER_LIST}
            >
              <Icons size={40} hidden type="tankerList" />
              {t('pageNames.tankerList')}
            </Menu.Item>
          )}
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="stockManagement" />
              <span>{t('pageMenu.stock')}</span>
            </>
          }
        >
          <Menu.Item key="stock" disabled>
            <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.stock')}</div>
          </Menu.Item>

          {modules?.M_TANKSTATUS && (
            <Menu.Item key={ROUTES.TANKS} style={{ display: 'flex', marginTop: 10 }} newscreen={ROUTES.TANKS}>
              <Icons size={40} hidden type="tankScreen" />
              {t('pageNames.tanks')}
            </Menu.Item>
          )}

          {modules?.M_TANKGROUPS && (
            <Menu.Item key={ROUTES.TANK_GROUPS} style={{ display: 'flex' }} newscreen={ROUTES.TANK_GROUPS}>
              <Icons size={40} hidden type="tankGroups" />
              {t('pageNames.tankGroups')}
            </Menu.Item>
          )}

          {modules?.M_SITEBALANCE && (
            <Menu.Item key={ROUTES.SITE_BALANCE} style={{ display: 'flex' }} newscreen={ROUTES.SITE_BALANCE}>
              <Icons size={40} hidden type="siteBalance" />
              {t('pageNames.siteBalance')}
            </Menu.Item>
          )}

          {modules?.M_TANKINVENTORY && (
            <Menu.Item
              key={ROUTES.TANK_INVENTORY}
              style={{ display: 'flex' }}
              newscreen={ROUTES.TANK_INVENTORY}
            >
              <Icons size={40} hidden type="tankInventory" />
              {t('pageNames.tankInventory')}
            </Menu.Item>
          )}

          {/* <Menu.Item key={ROUTES.TANK_STRAPPING} style={{ display: 'flex' }}>
            <Icons size={40}  hidden type="tankInventory" />
            {t('pageNames.tankStrapping')}
          </Menu.Item> */}

          {modules?.M_PRODUCTINVENTORY && (
            <Menu.Item
              key={ROUTES.PRODUCT_INVENTORY}
              style={{ display: 'flex' }}
              newscreen={ROUTES.PRODUCT_INVENTORY}
            >
              <Icons size={40} hidden type="productInventory" />
              <span>{t('pageNames.productInventory')}</span>
            </Menu.Item>
          )}

          {/* <Menu.Item key={ROUTES.TANK_STATUS} style={{ display: 'flex' }} newscreen={ROUTES.TANK_STATUS}>
            <Icons size={40} hidden type="tankStatus" />
            {t('pageNames.tankStatus')}
          </Menu.Item> */}

          {modules?.M_SFTRANSACTIONLIST && (
            <Menu.Item
              key={ROUTES.SELF_FUEL_TRANSACTION_LIST}
              style={{ display: 'flex', marginBottom: 10 }}
              newscreen={ROUTES.SELF_FUEL_TRANSACTION_LIST}
            >
              <Icons size={40} hidden type="selfFuelTransactionList" />
              {t('pageNames.selfFuelTransactionList')}
            </Menu.Item>
          )}
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="reports" />
              <span>{t('pageMenu.reports')}</span>
            </>
          }
        >
          <Menu.Item key="reports" disabled>
            <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.reports')}</div>
          </Menu.Item>

          {modules?.M_FOLIOMANAGEMENT && (
            <Menu.Item
              key={ROUTES.FOLIO_SUMMARY}
              style={{ display: 'flex', marginTop: 10 }}
              newscreen={ROUTES.FOLIO_SUMMARY}
            >
              <Icons size={40} hidden type="folioSummary" /> {t('pageNames.folioSummary')}
            </Menu.Item>
          )}

          {modules?.M_JASPERREPORTS && (
            <Menu.Item
              key={ROUTES.ON_DEMAND_REPORTS}
              style={{ display: 'flex' }}
              newscreen={ROUTES.ON_DEMAND_REPORTS}
            >
              <Icons size={40} hidden type="onDemandReports" /> {t('pageNames.onDemandReports')}
            </Menu.Item>
          )}

          {modules?.M_JOURNALREPORT && (
            <Menu.Item key={ROUTES.JOURNAL} style={{ display: 'flex' }} newscreen={ROUTES.JOURNAL}>
              <Icons size={40} hidden type="journal" /> {t('pageNames.journal')}
            </Menu.Item>
          )}

          {modules?.M_GSAPMESSAGING && (
            <Menu.Item
              key={ROUTES.HOST_MESSAGING_INTERFACE}
              style={{ display: 'flex' }}
              newscreen={ROUTES.HOST_MESSAGING_INTERFACE}
            >
              <Icons size={40} hidden type="hostMessagingInterface" /> {t('pageNames.hostMessagingInterface')}
            </Menu.Item>
          )}

          {modules?.M_ONSITEREPORT && (
            <Menu.Item
              key={ROUTES.PERSONNEL_ON_SITE}
              style={{ display: 'flex' }}
              newscreen={ROUTES.PERSONNEL_ON_SITE}
            >
              <Icons size={40} hidden type="personnelOnSite" /> {t('pageNames.personnelOnSite')}
            </Menu.Item>
          )}

          {modules?.M_AUDITREPORT && config.manageAuditing && (
            <Menu.Item
              key={ROUTES.AUDITING_DATA}
              style={{ display: 'flex' }}
              newscreen={ROUTES.AUDITING_DATA}
            >
              <Icons size={40} hidden type="auditingData" /> {t('pageNames.auditingData')}
            </Menu.Item>
          )}

          {modules?.M_METERING && (
            <Menu.Item
              key={ROUTES.METERING}
              style={{ display: 'flex', marginBottom: 10 }}
              newscreen={ROUTES.METERING}
            >
              <Icons size={40} hidden type="metering" /> {t('pageNames.metering')}
            </Menu.Item>
          )}
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="accessControl" />
              <span>{t('pageMenu.security')}</span>
            </>
          }
        >
          <Menu.Item key="security" disabled>
            <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.security')}</div>
          </Menu.Item>

          {modules?.M_PERSONNEL && (
            <Menu.Item
              key={ROUTES.PERSONNEL}
              style={{ display: 'flex', marginTop: 10 }}
              newscreen={ROUTES.PERSONNEL}
            >
              <Icons size={40} hidden type="personnel" /> {t('pageNames.personnel')}
            </Menu.Item>
          )}

          {modules?.M_IDENTIFICATIONASSIGNMENT && (
            <Menu.Item
              key={ROUTES.ID_ASSIGNMENT}
              style={{ display: 'flex' }}
              newscreen={ROUTES.ID_ASSIGNMENT}
            >
              <Icons size={40} hidden type="idAssignment" /> {t('pageNames.idAssignment')}
            </Menu.Item>
          )}

          {modules?.M_EXPIRYDATES && (
            <Menu.Item key={ROUTES.EXPIRY_DATES} style={{ display: 'flex' }} newscreen={ROUTES.EXPIRY_DATES}>
              <Icons size={40} hidden type="expiryDates" /> {t('pageNames.expiryDates')}
            </Menu.Item>
          )}

          {modules?.M_TIMECODES && (
            <Menu.Item key={ROUTES.TIME_CODES} style={{ display: 'flex' }} newscreen={ROUTES.TIME_CODES}>
              <Icons size={40} hidden type="timeCodes" /> {t('pageNames.timeCodes')}
            </Menu.Item>
          )}

          {modules?.M_ROLEACCESS && (
            <Menu.Item
              key={ROUTES.ROLE_ACCESS_MANAGEMENT}
              style={{ display: 'flex' }}
              newscreen={ROUTES.ROLE_ACCESS_MANAGEMENT}
            >
              <Icons size={40} hidden type="roleAccessManagement" /> {t('pageNames.roleAccessManagement')}
            </Menu.Item>
          )}

          {modules?.M_AREA && (
            <Menu.Item key={ROUTES.AREA} style={{ display: 'flex' }} newscreen={ROUTES.AREA}>
              <Icons size={40} hidden type="area" /> {t('pageNames.area')}
            </Menu.Item>
          )}

          {modules?.M_GATEPERMISSION && (
            <Menu.Item
              key={ROUTES.GATE_PERMISSION}
              style={{ display: 'flex', marginBottom: 10 }}
              newscreen={ROUTES.GATE_PERMISSION}
            >
              <Icons size={40} hidden type="gatePermission" /> {t('pageNames.gatePermission')}
            </Menu.Item>
          )}
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="products" />
              <span>{t('pageMenu.products')}</span>
            </>
          }
        >
          <Menu.Item key="products" disabled>
            <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.products')}</div>
          </Menu.Item>

          {modules?.M_BASEPRODUCTS && (
            <Menu.Item
              key={ROUTES.BASE_PRODUCTS}
              style={{ display: 'flex', marginTop: 10 }}
              newscreen={ROUTES.BASE_PRODUCTS}
            >
              <Icons size={40} hidden type="baseProducts" /> {t('pageNames.baseProducts')}
            </Menu.Item>
          )}

          {modules?.M_DRAWERPRODUCTS && (
            <Menu.Item
              key={ROUTES.DRAWER_PRODUCTS}
              style={{ display: 'flex' }}
              newscreen={ROUTES.DRAWER_PRODUCTS}
            >
              <Icons size={40} hidden type="drawerProducts" /> {t('pageNames.drawerProducts')}
            </Menu.Item>
          )}

          {modules?.M_HAZCHEM && (
            <Menu.Item
              key={ROUTES.HAZCHEM_CODES}
              style={{ display: 'flex' }}
              newscreen={ROUTES.HAZCHEM_CODES}
            >
              <Icons size={40} hidden type="hazchemCodes" /> {t('pageNames.hazchemCodes')}
            </Menu.Item>
          )}

          {modules?.M_DANGEROUSGOODS && (
            <Menu.Item
              key={ROUTES.DANGEROUS_GOODS}
              style={{ display: 'flex' }}
              newscreen={ROUTES.DANGEROUS_GOODS}
            >
              <Icons size={40} hidden type="dangerousGoods" /> {t('pageNames.dangerousGoods')}
            </Menu.Item>
          )}

          {modules?.M_PRODUCTS && (
            <Menu.Item
              key={ROUTES.PRODUCT_GROUPS}
              style={{ display: 'flex', marginBottom: 10 }}
              newscreen={ROUTES.PRODUCT_GROUPS}
            >
              <Icons size={40} hidden type="productGroups" /> {t('pageNames.productGroups')}
            </Menu.Item>
          )}
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="companies" />
              <span>{t('pageMenu.companies')}</span>
            </>
          }
        >
          <Menu.Item key="companies" disabled>
            <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.companies')}</div>
          </Menu.Item>

          {modules?.M_COMPANIES && (
            <Menu.Item
              key={ROUTES.COMPANIES}
              style={{ display: 'flex', marginTop: 10 }}
              newscreen={ROUTES.COMPANIES}
            >
              <Icons size={40} hidden type="companies" />
              {t('pageNames.companies')}
            </Menu.Item>
          )}

          {modules?.M_ALLOCATIONS && (
            <Menu.Item key={ROUTES.ALLOCATIONS} style={{ display: 'flex' }} newscreen={ROUTES.ALLOCATIONS}>
              <Icons size={40} hidden type="allocations" />
              {t('pageNames.allocations')}
            </Menu.Item>
          )}

          {modules?.M_CUSTOMERS && (
            <Menu.Item key={ROUTES.CUSTOMERS} style={{ display: 'flex' }} newscreen={ROUTES.CUSTOMERS}>
              <Icons size={40} hidden type="customerScreen" />
              {t('pageNames.customers')}
            </Menu.Item>
          )}

          {modules?.M_ADDRESSES && (
            <Menu.Item key={ROUTES.ADDRESSES} style={{ display: 'flex' }} newscreen={ROUTES.ADDRESSES}>
              <Icons size={40} hidden type="addresses" />
              {t('pageNames.addresses')}
            </Menu.Item>
          )}

          {modules?.M_DELIVERYLOCATIONS && (
            <Menu.Item
              key={ROUTES.DELIVERY_LOCATIONS}
              style={{ display: 'flex' }}
              newscreen={ROUTES.DELIVERY_LOCATIONS}
            >
              <Icons size={40} hidden type="deliveryLocations" />
              {t('pageNames.deliveryLocations')}
            </Menu.Item>
          )}

          {modules?.M_PARTNERS && config.managePartnersAndPartnership && (
            <Menu.Item key={ROUTES.PARTNERS} style={{ display: 'flex' }} newscreen={ROUTES.PARTNERS}>
              <Icons size={40} hidden type="partners" />
              {t('pageNames.partners')}
            </Menu.Item>
          )}

          {modules?.M_PARTNERSHIP && config.managePartnersAndPartnership && (
            <Menu.Item key={ROUTES.PARTNERSHIP} style={{ display: 'flex' }} newscreen={ROUTES.PARTNERSHIP}>
              <Icons size={40} hidden type="partnership" />
              {t('pageNames.partnership')}
            </Menu.Item>
          )}

          {modules?.M_CUSTOMERCATEGORIES && (
            <Menu.Item
              key={ROUTES.CUSTOMER_CATEGORIES}
              style={{ display: 'flex', marginBottom: 10 }}
              newscreen={ROUTES.CUSTOMER_CATEGORIES}
            >
              <Icons size={40} hidden type="customerCategories" />
              {t('pageNames.customerCategories')}
            </Menu.Item>
          )}
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="config" />
              <span>{t('pageMenu.config')}</span>
            </>
          }
        >
          <Menu.Item key="config" disabled>
            <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.config')}</div>
          </Menu.Item>

          {modules?.M_LOADBAYS && (
            <Menu.Item
              key={ROUTES.LOAD_BAYS}
              style={{ display: 'flex', marginTop: 10 }}
              newscreen={ROUTES.LOAD_BAYS}
            >
              <Icons size={40} hidden type="loadBays" />
              {t('pageNames.loadBays')}
            </Menu.Item>
          )}

          {modules?.M_BAYMOVEMENT && (
            <Menu.Item
              key={ROUTES.COMPANY_BAY_MOVEMENT}
              style={{ display: 'flex' }}
              newscreen={ROUTES.COMPANY_BAY_MOVEMENT}
            >
              <Icons size={40} hidden type="companyBayMovement" />
              {t('pageNames.companyBayMovement')}
            </Menu.Item>
          )}

          {modules?.M_LOADMETERS && (
            <Menu.Item key={ROUTES.LOAD_METERS} style={{ display: 'flex' }} newscreen={ROUTES.LOAD_METERS}>
              <Icons size={40} hidden type="loadMeters" />
              {t('pageNames.loadMeters')}
            </Menu.Item>
          )}

          {modules?.M_METERINGDEVICES && (
            <Menu.Item
              key={ROUTES.METER_DEVICES}
              style={{ display: 'flex' }}
              newscreen={ROUTES.METER_DEVICES}
            >
              <Icons size={40} hidden type="meterDevices" />
              {t('pageNames.meterDevices')}
            </Menu.Item>
          )}

          {modules?.M_PHYSICALPRINTERS && (
            <Menu.Item
              key={ROUTES.PHYSICAL_PRINTERS}
              style={{ display: 'flex' }}
              newscreen={ROUTES.PHYSICAL_PRINTERS}
            >
              <Icons size={40} hidden type="physicalPrinters" /> {t('pageNames.physicalPrinters')}
            </Menu.Item>
          )}

          {modules?.M_SITEACCESSDEVICES && (
            <Menu.Item
              key={ROUTES.SITE_ACCESS_DEVICES}
              style={{ display: 'flex' }}
              newscreen={ROUTES.SITE_ACCESS_DEVICES}
            >
              <Icons size={40} hidden type="siteAccessDevices" /> {t('pageNames.siteAccessDevices')}
            </Menu.Item>
          )}

          {modules?.M_KEYREADERDEVICES && (
            <Menu.Item
              key={ROUTES.KEY_READER_DEVICES}
              style={{ display: 'flex' }}
              newscreen={ROUTES.KEY_READER_DEVICES}
            >
              <Icons size={40} hidden type="keyReaderDevices" /> {t('pageNames.keyReaderDevices')}
            </Menu.Item>
          )}

          {modules?.M_TANKCONFIGURATION && (
            <Menu.Item
              key={ROUTES.TANK_CONFIGURATION}
              style={{ display: 'flex' }}
              newscreen={ROUTES.TANK_CONFIGURATION}
            >
              <Icons size={40} hidden type="tankConfiguration" /> {t('pageNames.tankConfiguration')}
            </Menu.Item>
          )}

          {modules?.M_LOGICALPRINTERS && (
            <Menu.Item
              key={ROUTES.LOGICAL_PRINTERS}
              style={{ display: 'flex' }}
              newscreen={ROUTES.LOGICAL_PRINTERS}
            >
              <Icons size={40} hidden type="logicalPrinters" /> {t('pageNames.logicalPrinters')}
            </Menu.Item>
          )}

          {modules?.M_REPOCONFIGURATION && (
            <Menu.Item
              key={ROUTES.REPORT_CONFIGURATION}
              style={{ display: 'flex' }}
              newscreen={ROUTES.REPORT_CONFIGURATION}
            >
              <Icons size={40} hidden type="reportConfiguration" /> {t('pageNames.reportConfiguration')}
            </Menu.Item>
          )}

          {modules?.M_REPOPROFILE && (
            <Menu.Item
              key={ROUTES.REPORT_PROFILE}
              style={{ display: 'flex' }}
              newscreen={ROUTES.REPORT_PROFILE}
            >
              <Icons size={40} hidden type="reportProfile" /> {t('pageNames.reportProfile')}
            </Menu.Item>
          )}

          {modules?.M_FOLIOSCHEDULING && (
            <Menu.Item
              key={ROUTES.FOLIO_SCHEDULLING}
              style={{ display: 'flex' }}
              newscreen={ROUTES.FOLIO_SCHEDULLING}
            >
              <Icons size={40} hidden type="folioScheduling" /> {t('pageNames.folioScheduling')}
            </Menu.Item>
          )}

          {modules?.M_MOVEMENTREASON && (
            <Menu.Item
              key={ROUTES.MOVEMENT_REASONS}
              style={{ display: 'flex', marginBottom: 10 }}
              newscreen={ROUTES.MOVEMENT_REASONS}
            >
              <Icons size={40} hidden type="movementReasons" /> {t('pageNames.movementReasons')}
            </Menu.Item>
          )}
        </SubMenu>

        <SubMenu
          title={
            <>
              <Icons type="modules" />
              <span>{t('pageMenu.modules')}</span>
            </>
          }
        >
          <Menu.Item key="modules" disabled>
            <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.modules')}</div>
          </Menu.Item>

          {modules?.M_BAYVIEW && (
            <Menu.Item
              key={ROUTES.BAY_VIEW}
              style={{ display: 'flex', marginTop: 10 }}
              newscreen={ROUTES.BAY_VIEW}
            >
              <Icons size={40} hidden type="bayView" />
              {t('pageNames.bayView')}
            </Menu.Item>
          )}

          {modules?.M_ADAPTIVEFLOW && (
            <Menu.Item
              key={ROUTES.ADAPTIVE_FLOW_CONTROL}
              style={{ display: 'flex' }}
              newscreen={ROUTES.ADAPTIVE_FLOW_CONTROL}
            >
              <Icons size={40} hidden type="adaptiveFlowControl" />
              {t('pageNames.adaptiveFlowControl')}
            </Menu.Item>
          )}

          {modules?.M_FSCSTATUS && (
            <Menu.Item
              key={ROUTES.FSC_STATUS}
              style={{ display: 'flex', marginBottom: 10 }}
              newscreen={ROUTES.FSC_STATUS}
            >
              <Icons size={40} hidden type="fscStatus" />
              {t('pageNames.fscStatus')}
            </Menu.Item>
          )}

          {modules?.M_TANKVIEW && (
            <Menu.Item
              key={ROUTES.TANK_VIEW}
              style={{ display: 'flex', marginTop: 10 }}
              newscreen={ROUTES.TANK_VIEW}
            >
              <Icons size={40} hidden type="tankView" />
              {t('pageNames.tankView')}
            </Menu.Item>
          )}
        </SubMenu>
      </Menu>
    </MenuContainer>
  );
};

export default Navigation;
