import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Layout, Icon } from "antd";

import { LogoContainer, MenuContainer } from "./style";
import { ROUTES } from "../../constants";

const { SubMenu } = Menu;
const { Sider } = Layout;

const Navigation = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleNavigation = event => {
    if (event?.key) {
      history.push(event.key);
    }
  };

  return (
    <Sider width={200}>
      <MenuContainer>
        <Menu
          onClick={handleNavigation}
          defaultSelectedKeys={[ROUTES.DASHBOARD]}
          theme="dark"
        >
          <LogoContainer>
            <img src="/images/dki_small.png" alt="logo" />
          </LogoContainer>

          <Menu.Item key={ROUTES.DASHBOARD}>
            <Icon type="fire" />
            <span>{t("pageMenu.dashboard")}</span>
          </Menu.Item>

          <SubMenu
            title={
              <span>
                <Icon type="clock-circle" />
                <span>{t("pageMenu.schedules")}</span>
              </span>
            }
          >
            <Menu.Item key={ROUTES.LOAD_SCHEDULES}>
              {t("pageNames.loadSchedules")}
            </Menu.Item>

            <Menu.Item key={ROUTES.EQUIPMENT_LIST}>
              {t("pageNames.equipmentList")}
            </Menu.Item>

            <Menu.Item key={ROUTES.TANKER_LIST}>
              {t("pageNames.tankerList")}
            </Menu.Item>

            <Menu.Item key={ROUTES.TRANSACTION_LIST}>
              {t("pageNames.transactionList")}
            </Menu.Item>

            <Menu.Item key={ROUTES.SELF_FUEL_TRANSACTION_LIST}>
              {t("pageNames.selfFuelTransactionList")}
            </Menu.Item>
          </SubMenu>

          <SubMenu
            title={
              <span>
                <Icon type="monitor" />
                <span>{t("pageMenu.gantry")}</span>
              </span>
            }
          >
            <Menu.Item key={ROUTES.LOAD_BAYS}>
              {t("pageNames.loadBays")}
            </Menu.Item>

            <Menu.Item key={ROUTES.COMPANIES}>
              {t("pageNames.companies")}
            </Menu.Item>

            <Menu.Item key={ROUTES.TANK_GROUPS}>
              {t("pageNames.tankGroups")}
            </Menu.Item>

            <Menu.Item key={ROUTES.BASE_PRODUCTS}>
              {t("pageNames.baseProducts")}
            </Menu.Item>

            <Menu.Item key={ROUTES.DRAWER_PRODUCTS}>
              {t("pageNames.drawerProducts")}
            </Menu.Item>

            <Menu.Item key={ROUTES.TANK_CONFIGURATION}>
              {t("pageNames.tankConfiguration")}
            </Menu.Item>

            <Menu.Item key={ROUTES.PRODUCT_GROUPS}>
              {t("pageNames.productGroups")}
            </Menu.Item>

            <Menu.Item key={ROUTES.ALLOCATIONS}>
              {t("pageNames.allocations")}
            </Menu.Item>

            <Menu.Item key={ROUTES.HAZCHEM_CODES}>
              {t("pageNames.hazchemCodes")}
            </Menu.Item>

            <Menu.Item key={ROUTES.LOAD_METERS}>
              {t("pageNames.loadMeters")}
            </Menu.Item>

            <Menu.Item key={ROUTES.COMPANY_BAY_MOVEMENT}>
              {t("pageNames.companyBayMovement")}
            </Menu.Item>
          </SubMenu>

          <SubMenu
            title={
              <span>
                <Icon type="file-done" />
                <span>{t("pageMenu.reports")}</span>
              </span>
            }
          >
            <Menu.Item key={ROUTES.JOURNAL}>
              {" "}
              {t("pageNames.journal")}
            </Menu.Item>
            <Menu.Item key={ROUTES.REPORT_PROFILE}>
              {t("pageNames.reportProfile")}
            </Menu.Item>

            <Menu.Item key={ROUTES.ON_DEMAND_REPORTS}>
              {t("pageNames.onDemandReports")}
            </Menu.Item>

            <Menu.Item key={ROUTES.REPORT_CONFIGURATION}>
              {t("pageNames.reportConfiguration")}
            </Menu.Item>

            <Menu.Item key={ROUTES.PERSONNEL_ON_SITE}>
              {t("pageNames.personnelOnSite")}
            </Menu.Item>

            <Menu.Item key={ROUTES.FOLIO_SUMMARY}>
              {t("pageNames.folioSummary")}
            </Menu.Item>

            <Menu.Item key={ROUTES.FOLIO_SCHEDULLING}>
              {t("pageNames.folioScheduling")}
            </Menu.Item>

            <Menu.Item key={ROUTES.HOST_MESSAGING_INTERFACE}>
              {t("pageNames.hostMessagingInterface")}
            </Menu.Item>

            <Menu.Item key={ROUTES.AUDITING_DATA}>
              {t("pageNames.auditingData")}
            </Menu.Item>
          </SubMenu>

          <SubMenu
            title={
              <span>
                <Icon type="file-protect" />
                <span>{t("pageMenu.accessControl")}</span>
              </span>
            }
          >
            <Menu.Item key={ROUTES.ID_ASSIGNMENT}>
              {t("pageNames.idAssignment")}
            </Menu.Item>

            <Menu.Item key={ROUTES.PERSONNEL}>
              {t("pageNames.personnel")}
            </Menu.Item>

            <Menu.Item key={ROUTES.ROLE_ACCESS_MANAGEMENT}>
              {t("pageNames.roleAccessManagement")}
            </Menu.Item>

            <Menu.Item key={ROUTES.EXPIRY_DATES}>
              {t("pageNames.expiryDates")}
            </Menu.Item>

            <Menu.Item key={ROUTES.AREA}>{t("pageNames.area")}</Menu.Item>

            <Menu.Item key={ROUTES.SITE_ACCESS_DEVICES}>
              {t("pageNames.siteAccessDevices")}
            </Menu.Item>

            <Menu.Item key={ROUTES.GATE_PERMISSION}>
              {t("pageNames.gatePermission")}
            </Menu.Item>

            <Menu.Item key={ROUTES.GATE_CONTROL}>
              {t("pageNames.gateControl")}
            </Menu.Item>

            <Menu.Item key={ROUTES.TIME_CODES}>
              {t("pageNames.timeCodes")}
            </Menu.Item>
          </SubMenu>

          <SubMenu
            title={
              <span>
                <Icon type="team" />
                <span>{t("pageMenu.customers")}</span>
              </span>
            }
          >
            <Menu.Item key={ROUTES.CUSTOMERS}>
              {t("pageNames.customers")}
            </Menu.Item>

            <Menu.Item key={ROUTES.ORDER_LISTING}>
              {t("pageNames.orderListing")}
            </Menu.Item>

            <Menu.Item key={ROUTES.ADDRESSES}>
              {t("pageNames.addresses")}
            </Menu.Item>

            <Menu.Item key={ROUTES.CUSTOMER_CATEGORIES}>
              {t("pageNames.customerCategories")}
            </Menu.Item>

            <Menu.Item key={ROUTES.DELIVERY_LOCATIONS}>
              {t("pageNames.deliveryLocations")}
            </Menu.Item>

            <Menu.Item key={ROUTES.PRICE_OFFSETS}>
              {t("pageNames.priceOffsets")}
            </Menu.Item>

            <Menu.Item key={ROUTES.CUSTOMER_PRICING}>
              {t("pageNames.customerPricing")}
            </Menu.Item>

            <Menu.Item key={ROUTES.ORDER_PRODUCT_PRICING}>
              {t("pageNames.orderProductPricing")}
            </Menu.Item>

            <Menu.Item key={ROUTES.PARTNERS}>
              {t("pageNames.partners")}
            </Menu.Item>

            <Menu.Item key={ROUTES.PARTNERSHIP}>
              {t("pageNames.partnership")}
            </Menu.Item>
          </SubMenu>

          <SubMenu
            title={
              <span>
                <Icon type="experiment" />
                <span>{t("pageMenu.stockManagement")}</span>
              </span>
            }
          >
            <Menu.Item key={ROUTES.METERING}>
              {t("pageNames.metering")}
            </Menu.Item>

            <Menu.Item key={ROUTES.SITE_BALANCE}>
              {t("pageNames.siteBalance")}
            </Menu.Item>

            <Menu.Item key={ROUTES.TANK_INVENTORY}>
              {t("pageNames.tankInventory")}
            </Menu.Item>

            <Menu.Item key={ROUTES.TANK_STATUS}>
              {t("pageNames.tankStatus")}
            </Menu.Item>

            <Menu.Item key={ROUTES.PRODUCT_MOVEMENT}>
              {t("pageNames.productMovement")}
            </Menu.Item>

            <Menu.Item key={ROUTES.INVENTORY_REQUESTS}>
              {t("pageNames.inventoryRequests")}
            </Menu.Item>

            <Menu.Item key={ROUTES.METER_DEVICES}>
              {t("pageNames.meterDevices")}
            </Menu.Item>
          </SubMenu>

          <SubMenu
            title={
              <span>
                <Icon type="printer" />
                <span>{t("pageMenu.printerConfiguration")}</span>
              </span>
            }
          >
            <Menu.Item key={ROUTES.PHYSICAL_PRINTERS}>
              {t("pageNames.physicalPrinters")}
            </Menu.Item>

            <Menu.Item key={ROUTES.LOGICAL_PRINTERS}>
              {t("pageNames.logicalPrinters")}
            </Menu.Item>
          </SubMenu>

          <SubMenu
            title={
              <span>
                <Icon type="cluster" />
                <span>{t("pageMenu.operations")}</span>
              </span>
            }
          >
            <Menu.Item key={ROUTES.TANK_VIEW}>
              {t("pageNames.tankView")}
            </Menu.Item>

            <Menu.Item key={ROUTES.BAY_VIEW}>
              {t("pageNames.bayView")}
            </Menu.Item>

            <Menu.Item key={ROUTES.DRAWER_PRODUCT_ASSETS}>
              {t("pageNames.drawerProductAssets")}
            </Menu.Item>

            <Menu.Item key={ROUTES.ADAPTIVE_FLOW_CONTROL}>
              {t("pageNames.logicalPrinters")}
            </Menu.Item>

            <Menu.Item key={ROUTES.FSC_STATUS}>
              {t("pageNames.fscStatus")}
            </Menu.Item>
          </SubMenu>
        </Menu>
      </MenuContainer>
    </Sider>
  );
};

export default Navigation;
