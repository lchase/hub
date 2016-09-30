import React, {Component} from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { REPLACE } from '../actions';

import App from './App';
import Content from './Content';
import PublicPage from './PublicPage';
import Dashboard from './Dashboard';
import Other from './Other';
import Login from './Login';
import Signup from './Signup';

import configureStore from '../store/configureStore';

const store = configureStore();

const history = syncHistoryWithStore(hashHistory, store);

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user, // how to get the user state
  redirectAction: REPLACE, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

export default class AdminLTETemplate extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <Route component={Content}>
              <IndexRoute component={Dashboard} />
              <Route path="other" component={UserIsAuthenticated(Other)} />
            </Route>
            <Route component={PublicPage}>
              <Route path="login" component={Login} />
            </Route>
            <Route path="signup" component={Signup} />      
          </Route>
        </Router>
      </Provider>
    );
  }
}