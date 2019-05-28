import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { LocaleProvider } from "antd";
import reduxThunk from "redux-thunk";
import reducers from "../reducers";
import Navigation from "../components/navigation";
import paths from "./paths";
import configuration from "../configuration";
import zhCN from "antd/lib/locale-provider/zh_CN";
import enUS from "antd/lib/locale-provider/en_US";

/**
 * @description
 * Creating main redux store to authenticate our credentials
 * This works along side the session store to authorize users.
 */

const store = createStore(
  reducers,
  {
    // sessionStorage.getItem("token")
    auth: { authenticated: true }
  },
  applyMiddleware(reduxThunk)
);

/**
 * @description
 * Main Routes Class
 * It provides all the routes to individual components.
 * It also wrapped in a redux provider which gives each component auth information.
 */

const App = () => (
  <Provider store={store}>
    <LocaleProvider locale={configuration.language === "CN" ? zhCN : enUS}>
      <BrowserRouter>
        <div>
          <Navigation config={configuration} />
          <Switch>
            {paths.map((item, index) => {
              return <Route exact key={index} path={item.path} component={item.component} />;
            })}
          </Switch>
        </div>
      </BrowserRouter>
    </LocaleProvider>
  </Provider>
);

export default App;
