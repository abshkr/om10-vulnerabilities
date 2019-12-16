import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import { Navigation, NavBar } from '../components';
import { GlobalContainer } from './style';
import paths from './paths';

const { Content, Sider, Header } = Layout;

const App = () => (
  <BrowserRouter>
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
            <Switch>
              {paths.map(item => {
                return <Route exact key={item.path} path={item.path} component={item.component} />;
              })}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </GlobalContainer>
  </BrowserRouter>
);

export default App;
