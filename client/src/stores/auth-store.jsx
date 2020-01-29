import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';

const authStore = createStore(
  reducers,
  {
    auth: { authenticated: sessionStorage.getItem('token') }
  },
  applyMiddleware(reduxThunk)
);

export default authStore;
