import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";

import React from "react";
import App from "next/app";
import { Layout } from "antd";
import { withTranslation } from "../../i18n";

const { Content, Sider } = Layout;

class Omega extends App {
  render() {
    const { Component, pageProps, auth, t } = this.props;

    console.log(this.props);

    if (auth) {
      return (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsedWidth={80} defaultCollapsed></Sider>

          <Layout>
            <Content>
              <Component {...pageProps} translate={t} />
            </Content>
          </Layout>
        </Layout>
      );
    }
    return <Component {...pageProps} translate={t} />;
  }
}

export default withTranslation("common")(Omega);
