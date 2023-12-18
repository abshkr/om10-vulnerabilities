/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const config = useConfig();

  const [active, setActive] = useState([ROUTES.HOME]);
  const [modules, setmodules] = useState([]);
  // const modules = {};

  const getItem = (key, label, icon, title, disabled, children, theme, type, popupOffset) => {
    return {
      key: key,
      icon,
      label: label,
      title: title,
      children: children,
      theme: theme,
      popupOffset: popupOffset,
    };
  };

  const getSubItemsOperation = () => {
    const items = [];

    if (modules?.M_LOADSCHEDULES) {
      items.push(
        getItem(
          ROUTES.LOAD_SCHEDULES,
          <span>{t('pageNames.loadSchedules')}</span>,
          <Icons size={40} hidden type="loadSchedules" />
        )
      );
    }

    if (modules?.M_ORDERLISTING) {
      items.push(
        getItem(
          ROUTES.ORDER_LISTING,
          <span>{t('pageNames.orderListing')}</span>,
          <Icons size={40} hidden type="orderListing" />
        )
      );
    }

    if (modules?.M_TRANSACTIONLIST) {
      items.push(
        getItem(
          ROUTES.TRANSACTION_LIST,
          <span>{t('pageNames.transactionList')}</span>,
          <Icons size={40} hidden type="transactionList" />
        )
      );
    }

    if (modules?.M_NOMINATION) {
      items.push(
        getItem(
          ROUTES.MOVEMENT_NOMINATIONS,
          <span>{t('pageNames.movementNominations')}</span>,
          <Icons size={40} hidden type="movementNominations" />
        )
      );
    }

    if (modules?.M_SPECIALMOVEMENTS) {
      items.push(
        getItem(
          ROUTES.SPECIAL_MOVEMENTS,
          <span>{t('pageNames.specialMovements')}</span>,
          <Icons size={40} hidden type="specialMovements" />
        )
      );
    }

    if (modules?.M_MANUALTRANSACTIONS && config?.manageMakeManualTransaction) {
      items.push(
        getItem(
          ROUTES.MANUAL_TRANSACTIONS,
          <span>{t('pageNames.manualTransactions')}</span>,
          <Icons size={40} hidden type="manualTransactions" />
        )
      );
    }

    if (modules?.M_PRODUCTMOVEMENT) {
      items.push(
        getItem(
          ROUTES.PRODUCT_MOVEMENTS,
          <span>{t('pageNames.productMovements')}</span>,
          <Icons size={40} hidden type="productMovements" />
        )
      );
    }

    if (modules?.M_INVENTORYREQUEST) {
      items.push(
        getItem(
          ROUTES.INVENTORY_REQUESTS,
          <span>{t('pageNames.inventoryRequests')}</span>,
          <Icons size={40} hidden type="inventoryRequests" />
        )
      );
    }

    if (modules?.M_GATECONTROL) {
      items.push(
        getItem(
          ROUTES.GATE_CONTROL,
          <span>{t('pageNames.gateControl')}</span>,
          <Icons size={40} hidden type="gateControl" />
        )
      );
    }

    if (modules?.M_EQUIPMENT) {
      items.push(
        getItem(
          ROUTES.EQUIPMENT_TYPES,
          <span>{t(config?.siteLabelUser + 'pageNames.equipmentTypes')}</span>,
          <Icons size={40} hidden type="equipmentTypes" />
        )
      );
    }

    if (modules?.M_EQUIPMENTLIST) {
      items.push(
        getItem(
          ROUTES.EQUIPMENT_LIST,
          <span>{t(config?.siteLabelUser + 'pageNames.equipmentList')}</span>,
          <Icons size={40} hidden type="equipmentList" />
        )
      );
    }

    if (modules?.M_TANKERS) {
      items.push(
        getItem(
          ROUTES.TANKER_LIST,
          <span>{t('pageNames.tankerList')}</span>,
          <Icons size={40} hidden type="tankerList" />
        )
      );
    }

    if (items.length > 0) {
      const header = getItem(
        'operations',
        <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.operations')}</div>,
        undefined,
        undefined,
        true
      );
      items.unshift(header);
    }

    return items;
  };

  const getSubItemsStock = () => {
    const items = [];

    if (modules?.M_TANKSTATUS) {
      items.push(
        getItem(
          ROUTES.TANKS,
          <span>{t('pageNames.tanks')}</span>,
          <Icons size={40} hidden type="tankScreen" />
        )
      );
    }

    if (modules?.M_TANKGROUPS) {
      items.push(
        getItem(
          ROUTES.TANK_GROUPS,
          <span>{t('pageNames.tankGroups')}</span>,
          <Icons size={40} hidden type="tankGroups" />
        )
      );
    }

    if (modules?.M_SITEBALANCE) {
      items.push(
        getItem(
          ROUTES.SITE_BALANCE,
          <span>{t('pageNames.siteBalance')}</span>,
          <Icons size={40} hidden type="siteBalance" />
        )
      );
    }

    if (modules?.M_TANKINVENTORY) {
      items.push(
        getItem(
          ROUTES.TANK_INVENTORY,
          <span>{t('pageNames.tankInventory')}</span>,
          <Icons size={40} hidden type="tankInventory" />
        )
      );
    }

    if (modules?.M_PRODUCTINVENTORY) {
      items.push(
        getItem(
          ROUTES.PRODUCT_INVENTORY,
          <span>{t('pageNames.productInventory')}</span>,
          <Icons size={40} hidden type="productInventory" />
        )
      );
    }

    if (modules?.M_SFTRANSACTIONLIST) {
      items.push(
        getItem(
          ROUTES.SELF_FUEL_TRANSACTION_LIST,
          <span>{t('pageNames.selfFuelTransactionList')}</span>,
          <Icons size={40} hidden type="selfFuelTransactionList" />
        )
      );
    }

    if (items.length > 0) {
      const header = getItem(
        'stock',
        <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.stock')}</div>,
        undefined,
        undefined,
        true
      );
      items.unshift(header);
    }

    return items;
  };

  const getSubItemsReport = () => {
    const items = [];

    if (modules?.M_FOLIOMANAGEMENT) {
      items.push(
        getItem(
          ROUTES.FOLIO_SUMMARY,
          <span>{t('pageNames.folioSummary')}</span>,
          <Icons size={40} hidden type="folioSummary" />
        )
      );
    }

    if (modules?.M_JASPERREPORTS) {
      items.push(
        getItem(
          ROUTES.ON_DEMAND_REPORTS,
          <span>{t('pageNames.onDemandReports')}</span>,
          <Icons size={40} hidden type="onDemandReports" />
        )
      );
    }

    if (modules?.M_JOURNALREPORT) {
      items.push(
        getItem(
          ROUTES.JOURNAL,
          <span>{t('pageNames.journal')}</span>,
          <Icons size={40} hidden type="journal" />
        )
      );
    }

    if (modules?.M_GSAPMESSAGING) {
      items.push(
        getItem(
          ROUTES.HOST_MESSAGING_INTERFACE,
          <span>{t('pageNames.hostMessagingInterface')}</span>,
          <Icons size={40} hidden type="hostMessagingInterface" />
        )
      );
    }

    if (modules?.M_ONSITEREPORT) {
      items.push(
        getItem(
          ROUTES.PERSONNEL_ON_SITE,
          <span>{t('pageNames.personnelOnSite')}</span>,
          <Icons size={40} hidden type="personnelOnSite" />
        )
      );
    }

    if (modules?.M_AUDITREPORT && config?.manageAuditing) {
      items.push(
        getItem(
          ROUTES.AUDITING_DATA,
          <span>{t('pageNames.auditingData')}</span>,
          <Icons size={40} hidden type="auditingData" />
        )
      );
    }

    if (modules?.M_METERING) {
      items.push(
        getItem(
          ROUTES.METERING,
          <span>{t('pageNames.metering')}</span>,
          <Icons size={40} hidden type="metering" />
        )
      );
    }

    if (items.length > 0) {
      const header = getItem(
        'reports',
        <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.reports')}</div>,
        undefined,
        undefined,
        true
      );
      items.unshift(header);
    }

    return items;
  };

  const getSubItemsSecurity = () => {
    const items = [];

    if (modules?.M_PERSONNEL) {
      items.push(
        getItem(
          ROUTES.PERSONNEL,
          <span>{t('pageNames.personnel')}</span>,
          <Icons size={40} hidden type="personnel" />
        )
      );
    }

    if (modules?.M_IDENTIFICATIONASSIGNMENT) {
      items.push(
        getItem(
          ROUTES.ID_ASSIGNMENT,
          <span>{t('pageNames.idAssignment')}</span>,
          <Icons size={40} hidden type="idAssignment" />
        )
      );
    }

    if (modules?.M_EXPIRYDATES) {
      items.push(
        getItem(
          ROUTES.EXPIRY_DATES,
          <span>{t('pageNames.expiryDates')}</span>,
          <Icons size={40} hidden type="expiryDates" />
        )
      );
    }

    if (modules?.M_TIMECODES) {
      items.push(
        getItem(
          ROUTES.TIME_CODES,
          <span>{t('pageNames.timeCodes')}</span>,
          <Icons size={40} hidden type="timeCodes" />
        )
      );
    }

    if (modules?.M_ROLEACCESS) {
      items.push(
        getItem(
          ROUTES.ROLE_ACCESS_MANAGEMENT,
          <span>{t('pageNames.roleAccessManagement')}</span>,
          <Icons size={40} hidden type="roleAccessManagement" />
        )
      );
    }

    if (modules?.M_AREA) {
      items.push(
        getItem(ROUTES.AREA, <span>{t('pageNames.area')}</span>, <Icons size={40} hidden type="area" />)
      );
    }

    if (modules?.M_GATEPERMISSION) {
      items.push(
        getItem(
          ROUTES.GATE_PERMISSION,
          <span>{t('pageNames.gatePermission')}</span>,
          <Icons size={40} hidden type="gatePermission" />
        )
      );
    }

    if (items.length > 0) {
      const header = getItem(
        'security',
        <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.security')}</div>,
        undefined,
        undefined,
        true
      );
      items.unshift(header);
    }

    return items;
  };

  const getSubItemsProduct = () => {
    const items = [];

    if (modules?.M_BASEPRODUCTS) {
      items.push(
        getItem(
          ROUTES.BASE_PRODUCTS,
          <span>{t('pageNames.baseProducts')}</span>,
          <Icons size={40} hidden type="baseProducts" />
        )
      );
    }

    if (modules?.M_DRAWERPRODUCTS) {
      items.push(
        getItem(
          ROUTES.DRAWER_PRODUCTS,
          <span>{t('pageNames.drawerProducts')}</span>,
          <Icons size={40} hidden type="drawerProducts" />
        )
      );
    }

    if (modules?.M_HAZCHEM) {
      items.push(
        getItem(
          ROUTES.HAZCHEM_CODES,
          <span>{t('pageNames.hazchemCodes')}</span>,
          <Icons size={40} hidden type="hazchemCodes" />
        )
      );
    }

    if (modules?.M_DANGEROUSGOODS) {
      items.push(
        getItem(
          ROUTES.DANGEROUS_GOODS,
          <span>{t('pageNames.dangerousGoods')}</span>,
          <Icons size={40} hidden type="dangerousGoods" />
        )
      );
    }

    if (modules?.M_PRODUCTS) {
      items.push(
        getItem(
          ROUTES.PRODUCT_GROUPS,
          <span>{t('pageNames.productGroups')}</span>,
          <Icons size={40} hidden type="productGroups" />
        )
      );
    }

    if (items.length > 0) {
      const header = getItem(
        'products',
        <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.products')}</div>,
        undefined,
        undefined,
        true
      );
      items.unshift(header);
    }

    return items;
  };

  const getSubItemsCompany = () => {
    const items = [];

    if (modules?.M_COMPANIES) {
      items.push(
        getItem(
          ROUTES.COMPANIES,
          <span>{t('pageNames.companies')}</span>,
          <Icons size={40} hidden type="companies" />
        )
      );
    }

    if (modules?.M_ALLOCATIONS) {
      items.push(
        getItem(
          ROUTES.ALLOCATIONS,
          <span>{t('pageNames.allocations')}</span>,
          <Icons size={40} hidden type="allocations" />
        )
      );
    }

    if (modules?.M_CUSTOMERS) {
      items.push(
        getItem(
          ROUTES.CUSTOMERS,
          <span>{t('pageNames.customers')}</span>,
          <Icons size={40} hidden type="customerScreen" />
        )
      );
    }

    if (modules?.M_ADDRESSES) {
      items.push(
        getItem(
          ROUTES.ADDRESSES,
          <span>{t('pageNames.addresses')}</span>,
          <Icons size={40} hidden type="addresses" />
        )
      );
    }

    if (modules?.M_DELIVERYLOCATIONS) {
      items.push(
        getItem(
          ROUTES.DELIVERY_LOCATIONS,
          <span>{t('pageNames.deliveryLocations')}</span>,
          <Icons size={40} hidden type="deliveryLocations" />
        )
      );
    }

    if (modules?.M_PARTNERS && config?.managePartnersAndPartnership) {
      items.push(
        getItem(
          ROUTES.PARTNERS,
          <span>{t('pageNames.partners')}</span>,
          <Icons size={40} hidden type="partners" />
        )
      );
    }

    if (modules?.M_PARTNERSHIP && config?.managePartnersAndPartnership) {
      items.push(
        getItem(
          ROUTES.PARTNERSHIP,
          <span>{t('pageNames.partnership')}</span>,
          <Icons size={40} hidden type="partnership" />
        )
      );
    }

    if (modules?.M_CUSTOMERCATEGORIES) {
      items.push(
        getItem(
          ROUTES.CUSTOMER_CATEGORIES,
          <span>{t('pageNames.customerCategories')}</span>,
          <Icons size={40} hidden type="customerCategories" />
        )
      );
    }

    if (items.length > 0) {
      const header = getItem(
        'companies',
        <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.companies')}</div>,
        undefined,
        undefined,
        true
      );
      items.unshift(header);
    }

    return items;
  };

  const getSubItemsConfig = () => {
    const items = [];

    if (modules?.M_LOADBAYS) {
      items.push(
        getItem(
          ROUTES.LOAD_BAYS,
          <span>{t('pageNames.loadBays')}</span>,
          <Icons size={40} hidden type="loadBays" />
        )
      );
    }

    if (modules?.M_LOADBAYS) {
      items.push(
        getItem(
          ROUTES.BAY_CONFIGURATION,
          <span>{t('pageNames.bayConfiguration')}</span>,
          <Icons size={40} hidden type="bayConfiguration" />
        )
      );
    }

    if (modules?.M_BAYMOVEMENT) {
      items.push(
        getItem(
          ROUTES.COMPANY_BAY_MOVEMENT,
          <span>{t('pageNames.companyBayMovement')}</span>,
          <Icons size={40} hidden type="companyBayMovement" />
        )
      );
    }

    if (modules?.M_LOADMETERS) {
      items.push(
        getItem(
          ROUTES.LOAD_METERS,
          <span>{t('pageNames.loadMeters')}</span>,
          <Icons size={40} hidden type="loadMeters" />
        )
      );
    }

    if (modules?.M_METERINGDEVICES) {
      items.push(
        getItem(
          ROUTES.METER_DEVICES,
          <span>{t('pageNames.meterDevices')}</span>,
          <Icons size={40} hidden type="meterDevices" />
        )
      );
    }

    if (modules?.M_PHYSICALPRINTERS) {
      items.push(
        getItem(
          ROUTES.PHYSICAL_PRINTERS,
          <span>{t('pageNames.physicalPrinters')}</span>,
          <Icons size={40} hidden type="physicalPrinters" />
        )
      );
    }

    if (modules?.M_SITEACCESSDEVICES) {
      items.push(
        getItem(
          ROUTES.SITE_ACCESS_DEVICES,
          <span>{t('pageNames.siteAccessDevices')}</span>,
          <Icons size={40} hidden type="siteAccessDevices" />
        )
      );
    }

    if (modules?.M_KEYREADERDEVICES) {
      items.push(
        getItem(
          ROUTES.KEY_READER_DEVICES,
          <span>{t('pageNames.keyReaderDevices')}</span>,
          <Icons size={40} hidden type="keyReaderDevices" />
        )
      );
    }

    if (modules?.M_TANKCONFIGURATION) {
      items.push(
        getItem(
          ROUTES.TANK_CONFIGURATION,
          <span>{t('pageNames.tankConfiguration')}</span>,
          <Icons size={40} hidden type="tankConfiguration" />
        )
      );
    }

    if (modules?.M_LOGICALPRINTERS) {
      items.push(
        getItem(
          ROUTES.LOGICAL_PRINTERS,
          <span>{t('pageNames.logicalPrinters')}</span>,
          <Icons size={40} hidden type="logicalPrinters" />
        )
      );
    }

    if (modules?.M_REPOCONFIGURATION) {
      items.push(
        getItem(
          ROUTES.REPORT_CONFIGURATION,
          <span>{t('pageNames.reportConfiguration')}</span>,
          <Icons size={40} hidden type="reportConfiguration" />
        )
      );
    }

    if (modules?.M_REPOPROFILE) {
      items.push(
        getItem(
          ROUTES.REPORT_PROFILE,
          <span>{t('pageNames.reportProfile')}</span>,
          <Icons size={40} hidden type="reportProfile" />
        )
      );
    }

    if (modules?.M_FOLIOSCHEDULING) {
      items.push(
        getItem(
          ROUTES.FOLIO_SCHEDULLING,
          <span>{t('pageNames.folioScheduling')}</span>,
          <Icons size={40} hidden type="folioScheduling" />
        )
      );
    }

    if (modules?.M_MOVEMENTREASON) {
      items.push(
        getItem(
          ROUTES.MOVEMENT_REASONS,
          <span>{t('pageNames.movementReasons')}</span>,
          <Icons size={40} hidden type="movementReasons" />
        )
      );
    }

    if (items.length > 0) {
      const header = getItem(
        'config',
        <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.config')}</div>,
        undefined,
        undefined,
        true
      );
      items.unshift(header);
    }

    return items;
  };

  const getSubItemsModule = () => {
    const items = [];

    if (modules?.M_BAYVIEW) {
      items.push(
        getItem(
          ROUTES.BAY_VIEW,
          <span>{t('pageNames.bayView')}</span>,
          <Icons size={40} hidden type="bayView" />
        )
      );
    }

    if (modules?.M_ADAPTIVEFLOW) {
      items.push(
        getItem(
          ROUTES.ADAPTIVE_FLOW_CONTROL,
          <span>{t('pageNames.adaptiveFlowControl')}</span>,
          <Icons size={40} hidden type="adaptiveFlowControl" />
        )
      );
    }

    if (modules?.M_FSCSTATUS) {
      items.push(
        getItem(
          ROUTES.FSC_STATUS,
          <span>{t('pageNames.fscStatus')}</span>,
          <Icons size={40} hidden type="fscStatus" />
        )
      );
    }

    if (modules?.M_TANKVIEW) {
      items.push(
        getItem(
          ROUTES.TANK_VIEW,
          <span>{t('pageNames.tankView')}</span>,
          <Icons size={40} hidden type="tankView" />
        )
      );
    }

    if (items.length > 0) {
      const header = getItem(
        'modules',
        <div style={{ fontSize: 18, fontWeight: 500, color: 'white' }}>{t('pageMenu.modules')}</div>,
        undefined,
        undefined,
        true
      );
      items.unshift(header);
    }

    return items;
  };

  const getMenuItems = () => {
    const items = [];

    /* items.push(
      getItem(
        'dki_logo', 
        (
          <LogoContainer>
            <img src="/images/dki_small.png" alt="logo" style={{ height: 300 }} />
          </LogoContainer>        
        ),
        undefined,
        `${t('generic.version')} ${SETTINGS.VERSION}`,
      )
    ); */

    items.push(getItem(ROUTES.HOME, <span>{t('pageMenu.dashboard')}</span>, <Icons type="dashboard" />));

    const operItems = getSubItemsOperation();
    if (operItems.length > 0) {
      items.push(
        getItem(
          'operationsManagement',
          <span>{t('pageMenu.operations')}</span>,
          <Icons type="operations" />,
          undefined,
          undefined,
          operItems,
          undefined,
          undefined,
          [10, 0]
        )
      );
    }

    const stckItems = getSubItemsStock();
    if (stckItems.length > 0) {
      items.push(
        getItem(
          'stocksManagement',
          <span>{t('pageMenu.stock')}</span>,
          <Icons type="stockManagement" />,
          undefined,
          undefined,
          stckItems,
          undefined,
          undefined,
          [10, 0]
        )
      );
    }

    const rprtItems = getSubItemsReport();
    if (rprtItems.length > 0) {
      items.push(
        getItem(
          'reportsManagement',
          <span>{t('pageMenu.reports')}</span>,
          <Icons type="reports" />,
          undefined,
          undefined,
          rprtItems,
          undefined,
          undefined,
          [10, 0]
        )
      );
    }

    const safeItems = getSubItemsSecurity();
    if (safeItems.length > 0) {
      items.push(
        getItem(
          'securitysManagement',
          <span>{t('pageMenu.security')}</span>,
          <Icons type="accessControl" />,
          undefined,
          undefined,
          safeItems,
          undefined,
          undefined,
          [10, 0]
        )
      );
    }

    const prodItems = getSubItemsProduct();
    if (prodItems.length > 0) {
      items.push(
        getItem(
          'productsManagement',
          <span>{t('pageMenu.products')}</span>,
          <Icons type="products" />,
          undefined,
          undefined,
          prodItems,
          undefined,
          undefined,
          [10, 0]
        )
      );
    }

    const cmpyItems = getSubItemsCompany();
    if (cmpyItems.length > 0) {
      items.push(
        getItem(
          'companysManagement',
          <span>{t('pageMenu.companies')}</span>,
          <Icons type="companies" />,
          undefined,
          undefined,
          cmpyItems,
          undefined,
          undefined,
          [10, 0]
        )
      );
    }

    const cnfgItems = getSubItemsConfig();
    if (cnfgItems.length > 0) {
      items.push(
        getItem(
          'settingsManagement',
          <span>{t('pageMenu.config')}</span>,
          <Icons type="config" />,
          undefined,
          undefined,
          cnfgItems,
          undefined,
          undefined,
          [10, 0]
        )
      );
    }

    const modlItems = getSubItemsModule();
    if (modlItems.length > 0) {
      items.push(
        getItem(
          'modulesManagement',
          <span>{t('pageMenu.modules')}</span>,
          <Icons type="modules" />,
          undefined,
          undefined,
          modlItems,
          undefined,
          undefined,
          [10, 0]
        )
      );
    }

    return items;
  };

  // props: onClick -	Called when a menu item is clicked -	function({ item, key, keyPath, domEvent })
  const handleNavigation = (event) => {
    setActive([[event.key]]);

    if (event?.key === ROUTES.TANK_STATUS) {
      navigate(ROUTES.TANKS, {
        listed: true,
      });
    } else if (event?.key === ROUTES.BAY_VIEW) {
      // const access = useAuth('M_BAYVIEW'); //Cannot use useAuth here because this is a function not a component
      api.get(`${AUTH.PERMISSIONS}?object_text=M_BAYVIEW`).then((res) => {
        if (!res.data.records[0].priv_view) {
          console.log('Do not have view privilege');
          navigate(ROUTES.UNAUTHORIZED);
        } else {
          const port = window.location.port ? window.location.port : 443;
          api
            .get(`https://${window.location.hostname}:${port}/scadaviews/bayview/index.html`)
            .then((res) => {
              if (res.data.includes('<title>OMEGA 5000</title>')) {
                navigate(ROUTES.BAY_VIEW);
              } else {
                window.open(
                  `https://${window.location.hostname}:${port}/scadaviews/bayview/index.html`,
                  '_blank'
                );
              }
            })
            .catch(function (error) {
              navigate(ROUTES.BAY_VIEW);
            });
        }
      });
    } else {
      navigate(event.key);
    }
  };

  //Middle click to open on a new tab. Use newscreen because cannot find a better way
  const onMouseDown = (event) => {
    console.log(',,,,,,,,,,,,,,,', event, event.target);
    if (event.button === 1) {
      event.target.getAttribute('key') &&
        window.open(window.location.origin + event.target.getAttribute('key'), '_blank');
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

  return (
    <MenuContainer>
      <LogoContainer>
        <Tooltip
          placement="right"
          title={`${t('generic.version')} ${SETTINGS.VERSION}`}
          align={{ offset: [28, 0] }}
        >
          <img src="/images/dki_small.png" alt="logo" style={{ height: 300 }} />
        </Tooltip>
      </LogoContainer>
      <Menu
        onMouseDown={onMouseDown}
        onClick={handleNavigation}
        defaultSelectedKeys={active}
        style={{ width: '100%' }}
        theme="dark"
        items={getMenuItems()}
      ></Menu>
    </MenuContainer>
  );
};

export default Navigation;
