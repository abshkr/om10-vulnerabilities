import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Layout } from 'antd';

import { NavBar, Navigation, Status } from '..';
import ConfigProvider from 'context/config-context';
import { InterfaceContainer } from './style';

const { Content, Sider, Footer } = Layout;

const Interface = ({ auth, children }) => {
  return auth ? (
    <InterfaceContainer>
      <ConfigProvider>
        <Layout className="layout">
          <Sider width={250} collapsedWidth={120} collapsible defaultCollapsed>
            <Navigation />
          </Sider>
          <Layout className="omega">
            <NavBar />
            <Content className="content">{children}</Content>
            <Footer>
              <Status />
            </Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </InterfaceContainer>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

const AuthStoreMap = (state) => {
  return { auth: state.auth.authenticated };
};

export default connect(AuthStoreMap)(Interface);
