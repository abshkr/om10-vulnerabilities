import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";

import React from "react";
import { Layout } from "antd";
import App from "next/app";

import { GlobalContainer } from "../styles";

import "../localization/i18n";

const { Content, Sider, Header } = Layout;

class Omega extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <GlobalContainer>
        <Layout className="layout">
          <Sider className="slider" collapsible width={250} defaultCollapsed />
          <Layout>
            <Header className="header">test</Header>
            <Content className="content">
              <Component {...pageProps} />
            </Content>
          </Layout>
        </Layout>
      </GlobalContainer>
    );
  }
}
export default Omega;
