import Loading from "../components/loading";
import Loadable from "react-loadable";
import { ROUTES } from "../constants";

const paths = [
  {
    path: ROUTES.DASHBOARD,
    component: Loadable({
      loader: () => import("../pages/dashboard"),
      loading: Loading
    })
  },
  {
    path: ROUTES.UNAUTHORIZED,
    component: Loadable({
      loader: () => import("../pages/unauthorized"),
      loading: Loading
    })
  },
  {
    path: ROUTES.PERSONNEL,
    component: Loadable({
      loader: () => import("../pages/personnel"),
      loading: Loading
    })
  },
  {
    path: ROUTES.LOGICAL_PRINTERS,
    component: Loadable({
      loader: () => import("../pages/logicalPrinters"),
      loading: Loading
    })
  },
  {
    path: ROUTES.PHYSICAL_PRINTERS,
    component: Loadable({
      loader: () => import("../pages/physicalPrinters"),
      loading: Loading
    })
  },
  {
    path: ROUTES.FOLIO_SUMMARY,
    component: Loadable({
      loader: () => import("../pages/folioSummary"),
      loading: Loading
    })
  },
  {
    path: ROUTES.CUSTOMER_CATEGORIES,
    component: Loadable({
      loader: () => import("../pages/customerCategories"),
      loading: Loading
    })
  },
  {
    path: ROUTES.METERING,
    component: Loadable({
      loader: () => import("../pages/metering"),
      loading: Loading
    })
  },
  {
    path: ROUTES.TANK_INVENTORY,
    component: Loadable({
      loader: () => import("../pages/tankInventory"),
      loading: Loading
    })
  },
  {
    path: ROUTES.SITE_BALANCE,
    component: Loadable({
      loader: () => import("../pages/siteBalance"),
      loading: Loading
    })
  },
  {
    path: ROUTES.PRODUCT_INVENTORY,
    component: Loadable({
      loader: () => import("../pages/productInventory"),
      loading: Loading
    })
  },
  {
    path: ROUTES.BASE_PRODUCTS,
    component: Loadable({
      loader: () => import("../pages/baseProducts"),
      loading: Loading
    })
  },
  {
    path: ROUTES.TANK_VIEW,
    component: Loadable({
      loader: () => import("../pages/tankView"),
      loading: Loading
    })
  },
  {
    path: ROUTES.TANK_CONFIGURATIONS,
    component: Loadable({
      loader: () => import("../pages/tankConfiguration"),
      loading: Loading
    })
  },
  {
    path: ROUTES.TANK_STATUS,
    component: Loadable({
      loader: () => import("../pages/tankStatus"),
      loading: Loading
    })
  },
  {
    path: ROUTES.ADAPTIVE_FLOW_CONTROL,
    component: Loadable({
      loader: () => import("../pages/adaptiveFlowControl"),
      loading: Loading
    })
  }
];

export default paths;
