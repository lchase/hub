import React, {Component} from 'react';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper'
import cookie from 'react-cookie';
import auth from '../auth';

import configureStore from '../store/configureStore';

import routes from '../routes';

const store = configureStore();

const token = cookie.load(auth.constants.JWT_TOKEN_COOKIE_NAME);
if (token) {
  //TODO: user should be pulled from JWT token
  store.dispatch(auth.actions.authUser(cookie.load('user')));
}

const history = syncHistoryWithStore(hashHistory, store);

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user, // how to get the user state
  redirectAction: 'REPLACE', // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});

export default class AdminLTETemplate extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}