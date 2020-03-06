import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Layout } from 'antd';

import { InterfaceContainer } from './style';
import { NavBar, Navigation } from '..';

const { Content, Footer, Sider } = Layout;

const Interface = ({ auth, children }) => {
  return auth ? (
    <InterfaceContainer>
      <Layout className="layout">
        <Sider width={250} collapsible defaultCollapsed>
          <Navigation />
        </Sider>
        <Layout>
          <NavBar />
          <Content className="content">{children}</Content>
          <Footer>OMEGA 5000 (V9.10.0) </Footer>
        </Layout>
      </Layout>
    </InterfaceContainer>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

const AuthStoreMap = state => {
  return { auth: state.auth.authenticated };
};

export default connect(AuthStoreMap)(Interface);
