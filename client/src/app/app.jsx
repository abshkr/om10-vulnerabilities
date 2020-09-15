import React, { Suspense, useEffect } from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';

import en from 'antd/es/locale/en_GB';
import cn from 'antd/es/locale/zh_CN';

import { GlobalStyleProvider, AntdStyleProvider } from '../styles';
import { Interface, Loading } from '../components';
import { authStore } from '../stores';
import { ROUTES } from '../constants';

import onError from 'api/on-error';
import paths from './paths';
import api from 'api';

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
  
  useEffect(() => {
    const sessionLanguage = sessionStorage.getItem('language');
    if (sessionLanguage !== 'en') {
      i18n.changeLanguage(sessionLanguage);
    }
  }, []);
  
  return (
    <ConfigProvider locale={language}>
      <Provider store={authStore}>
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher: (url) => api.get(url).then((response) => response.data),
            errorRetryCount: 3,
            onError: onError,
          }}
        >
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
        </SWRConfig>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
