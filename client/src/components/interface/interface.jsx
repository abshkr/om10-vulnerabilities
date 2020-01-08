import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Layout } from 'antd';

import { InterfaceContainer } from './style';
import { NavBar, Navigation } from '..';

const { Content } = Layout;

const Interface = ({ auth, children }) => {
  return auth ? (
    <InterfaceContainer>
      <Layout className="layout">
        <Navigation />
        <Layout>
          <NavBar />
          <Content className="content">{children}</Content>
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
