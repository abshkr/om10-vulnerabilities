import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Layout } from "antd";
import { Navigation } from "../components";
import reduxThunk from "redux-thunk";
import reducers from "../reducers";
import paths from "./paths";

import "./app.css";

const { Content, Sider } = Layout;

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

export default class App extends Component {
  state = {
    collapsed: false,
    defaultKey: ["1"],
    filter: ""
  };

  handleMenuState = collapsed => {
    this.setState({
      collapsed
    });
  };

  render() {
    const { collapsed, defaultKey } = this.state;

    const routes = paths(collapsed);

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout className="app" style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={this.handleMenuState} width={256}>
              <Navigation defaultKey={defaultKey} />
            </Sider>
            <Layout>
              <div className="search" style={{ background: "#fff", padding: 10, height: "6vh", paddingLeft: 40 }} />
              <Content className="content">
                <div>
                  <Switch>
                    {routes.map((item, index) => {
                      return <Route exact key={index} path={item.path} component={item.component} />;
                    })}
                  </Switch>
                </div>
              </Content>
            </Layout>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}
