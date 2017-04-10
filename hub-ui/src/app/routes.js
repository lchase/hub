import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { routerActions } from 'react-router-redux'

import App from './App';
import Content from '../components/layout/Content';
import PublicPage from '../components/layout/PublicPage';
import DashboardContainer from '../dashboard/components/DashboardContainer';
import Other from '../components/Other';

import Login from '../auth/components/Login';
import Register from '../auth/components/Register';
import { UserAuthWrapper } from 'redux-auth-wrapper'

import Profile from '../components/profile/Profile';

import NotFoundPage from '../components/NotFoundPage'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});

export default (
  <Route path="/" component={App}>
    <Route component={Content}>
      <IndexRoute component={UserIsAuthenticated(DashboardContainer)} />
      <Route path="profile" component={Profile} />
      <Route path="other" component={Other} />
    </Route>
    <Route component={PublicPage}>
      <Route path="login" component={Login} />
    </Route>
    <Route path="register" component={Register} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);