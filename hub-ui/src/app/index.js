import React, {Component} from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import cookie from 'react-cookie';
import auth from '../auth';

import configureStore from './configureStore';

import routes from './routes';

const storeHistoryConfig = configureStore();

const token = cookie.load(auth.constants.HUB_JWT_TOKEN_COOKIE_NAME);
if (token) {
  storeHistoryConfig.store.dispatch(auth.actions.authUserFromToken(token));
}

export default class AdminLTETemplate extends Component {
  render() {
    return (
      <Provider store={storeHistoryConfig.store}>
        <Router history={storeHistoryConfig.history} routes={routes} />
      </Provider>
    );
  }
}