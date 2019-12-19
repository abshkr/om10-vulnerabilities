import React from "react";
import { Layout } from "antd";

import { InterfaceContainer } from "./style";
import { NavBar, Navigation } from "..";

const { Content } = Layout;

const Interface = ({ children }) => (
  <InterfaceContainer>
    <Layout className="layout">
      <Navigation />
      <Layout>
        <NavBar />
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  </InterfaceContainer>
);

export default Interface;
