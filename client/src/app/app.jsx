import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { Interface } from '../components';
import reducers from '../reducers';
import paths from './paths';

/**
 * @description
 * Creating main redux store to authenticate our credentials
 */

const store = createStore(
  reducers,
  {
    auth: { authenticated: sessionStorage.getItem('token') }
  },
  applyMiddleware(reduxThunk)
);

/**
 * @description
 * Main Routes Class
 * It provides all the routes to individual components.
 * It also wrapped in a redux provider which gives each component auth information.
 * All modules are lazy loaded via the path array.
 */

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Interface>
        <Switch>
          {paths.map(item => {
            return <Route key={item.path} path={item.path} component={item.component} />;
          })}
        </Switch>
      </Interface>
    </BrowserRouter>
  </Provider>
);

export default App;
