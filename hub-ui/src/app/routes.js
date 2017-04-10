import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Content from '../components/layout/Content';
import PublicPage from '../components/layout/PublicPage';
import DashboardContainer from '../dashboard/components/DashboardContainer';
import Other from '../components/Other';

import Login from '../auth/components/Login';
import Register from '../auth/components/Register';
import AuthWrapper from '../auth/components/AuthWrapper';

import Profile from '../components/profile/Profile';

import NotFoundPage from '../components/NotFoundPage'

export default (
  <Route path="/" component={App}>
    <Route component={Content}>
      <IndexRoute component={AuthWrapper(DashboardContainer)} />
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