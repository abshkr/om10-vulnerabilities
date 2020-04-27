import React, { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import en from 'antd/es/locale/en_GB';
import cn from 'antd/es/locale/zh_CN';

import { GlobalStyleProvider, AntdStyleProvider } from '../styles';
import { Interface, Loading } from '../components';
import { authStore } from '../stores';
import { ROUTES } from '../constants';
import paths from './paths';
import { useTranslation } from 'react-i18next';

/**
 * @description
 * Creating main redux store to authenticate our credentials
 */

/**
 * @description
 * Main Routes Class
 * It provides all the routes to individual components.
 * It also wrapped in a redux provider which gives each component auth information.
 * All modules are lazy loaded via the path array.
 */

const locale = {
  en,
  cn,
};

const App = () => {
  const { i18n } = useTranslation();

  const language = locale[i18n.language];

  return (
    <ConfigProvider locale={language}>
      <Provider store={authStore}>
        <BrowserRouter>
          <Interface>
            <GlobalStyleProvider primary="#0054A4" />
            <AntdStyleProvider primary="#0054A4" />
            <Suspense fallback={<Loading />}>
              <Switch>
                {paths.map((item) => {
                  return <Route key={item.path} path={item.path} component={item.component} />;
                })}
                <Redirect path={ROUTES.ROOT} to={ROUTES.LOG_IN} />
              </Switch>
            </Suspense>
          </Interface>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
