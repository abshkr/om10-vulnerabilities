import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Layout } from 'antd';

import { InterfaceContainer } from './style';
import { NavBar, Navigation } from '..';

const { Content, Footer } = Layout;

const Interface = ({ auth, children }) => {
  return auth ? (
    <InterfaceContainer>
      <Layout className="layout">
        <Navigation />
        <Layout>
          <NavBar />
          <Content className="content">{children}</Content>
          <Footer>OMEGA 5000 </Footer>
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
