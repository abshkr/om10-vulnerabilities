import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { GlobalStyleProvider, AntdStyleProvider } from '../styles';
import { Interface, Loading } from '../components';
import { ROUTES } from '../constants';

import paths from './paths';

import { authStore } from '../stores';

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

const App = () => (
  <Provider store={authStore}>
    <BrowserRouter>
      <Interface>
        <GlobalStyleProvider />
        <AntdStyleProvider />
        <Suspense fallback={<Loading />}>
          <Switch>
            {paths.map(item => {
              return <Route key={item.path} path={item.path} component={item.component} />;
            })}
            <Redirect path={ROUTES.ROOT} to={ROUTES.LOG_IN} />
          </Switch>
        </Suspense>
      </Interface>
    </BrowserRouter>
  </Provider>
);

export default App;
