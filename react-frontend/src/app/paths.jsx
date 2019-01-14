import Loading from "../components/loading";
import Loadable from "react-loadable";
import * as ROUTES from "../constants/routes";

/**
 * @description
 * Code Splitting via React Loodable
 * helps us minimize the bundle size.
 * @TODO This will be replaced with the Lazy, Suspense loading in React 16.6
 */

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
    path: ROUTES.SITE_CONFIGURATION,
    component: Loadable({
      loader: () => import("../pages/siteConfiguration"),
      loading: Loading
    })
  },
  {
    path: ROUTES.SIGN_OUT,
    component: Loadable({
      loader: () => import("../pages/signOut"),
      loading: Loading
    })
  },
  {
    path: ROUTES.SIGN_IN,
    component: Loadable({
      loader: () => import("../pages/siginIn"),
      loading: Loading
    })
  },
  {
    path: ROUTES.DRIVER_MESSAGING,
    component: Loadable({
      loader: () => import("../pages/driverMessaging"),
      loading: Loading
    })
  },
  {
    path: ROUTES.ON_DEMAND_REPORTS,
    component: Loadable({
      loader: () => import("../pages/onDemandReports"),
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
    path: ROUTES.CUSTOMER_CATEGORIES,
    component: Loadable({
      loader: () => import("../pages/customerCategories"),
      loading: Loading
    })
  },
  {
    path: ROUTES.JOURNAL,
    component: Loadable({
      loader: () => import("../pages/journal"),
      loading: Loading
    })
  },
  {
    path: ROUTES.ID_ASSIGNMENT,
    component: Loadable({
      loader: () => import("../pages/idAssignment"),
      loading: Loading
    })
  },
  {
    path: ROUTES.PERSONNEL,
    component: Loadable({
      loader: () => import("../pages/personnel"),
      loading: Loading
    })
  }
];

export default paths;
