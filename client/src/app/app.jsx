import React, { Suspense, createElement, useEffect } from 'react';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';

import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';

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

// This implements the default behavior from styled-components v5
function shouldForwardProp(propName, target) {
  if (typeof target === 'string') {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
}

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
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
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
                  <Routes>
                    {paths.map((item) => {
                      // return <Route key={item.path} path={item.path} Component={item.component} />;
                      return (
                        <Route key={item.path} path={item.path} element={createElement(item.component)} />
                      );
                    })}
                    <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.LOG_IN} />} />
                  </Routes>
                </Suspense>
              </Interface>
            </BrowserRouter>
          </SWRConfig>
        </Provider>
      </ConfigProvider>
    </StyleSheetManager>
  );
};

export default App;
