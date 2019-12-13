import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";

import React from "react";
import { Layout } from "antd";
import App from "next/app";

import { GlobalContainer } from "../styles";
import { NavBar, Navigation } from "../components";

import "../localization/i18n";
import "../styles/index.less";

const { Content, Sider, Header } = Layout;

class Omega extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    const auth = router.route !== "/login";

    if (auth) {
      return (
        <GlobalContainer>
          <Layout className="layout">
            <Sider collapsible width={250} defaultCollapsed>
              <Navigation />
            </Sider>

            <Layout>
              <Header className="header">
                <NavBar />
              </Header>

              <Content className="content">
                <Component {...pageProps} />
              </Content>
            </Layout>
          </Layout>
        </GlobalContainer>
      );
    }

    return (
      <GlobalContainer>
        <Component {...pageProps} />
      </GlobalContainer>
    );
  }
}
export default Omega;
