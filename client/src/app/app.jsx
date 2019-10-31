import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import { Navigation } from '../components';
import paths from './paths';

const { Content, Sider } = Layout;

const App = () => (
  <BrowserRouter>
    <Layout className="app" style={{ minHeight: '100vh' }}>
      <Sider collapsible width={256} defaultCollapsed>
        <Navigation />
      </Sider>

      <Layout>
        <Content className="content">
          <div>
            <Switch>
              {paths.map((item, index) => {
                return <Route exact key={index} path={item.path} component={item.component} />;
              })}
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  </BrowserRouter>
);

export default App;
