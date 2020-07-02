import React, { Fragment, useEffect } from 'react';

import { connect } from 'react-redux';
import { Layout } from 'antd';

import { NavBar, Navigation, Status } from '..';
import { InterfaceContainer } from './style';

import ConfigProvider from 'context/config-context';
import * as actions from 'actions/auth';

const { Content, Sider, Footer } = Layout;

const Interface = ({ token, onRefresh, children }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      onRefresh(token);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return token ? (
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

const mapStateToProps = (state) => {
  return { token: state.auth.authenticated };
};

const mapActionsToProps = (dispatch) => ({
  onRefresh: (token) => dispatch(actions.refresh(token)),
});

export default connect(mapStateToProps, mapActionsToProps)(Interface);
