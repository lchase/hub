import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import auth from '../auth';
import errorReducer from './error_reducer';
import preferenceReducer from './preference_reducer';
import dashboard from '../dashboard';

import ping from '../ping';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  auth: auth.reducer,
  errors: errorReducer,
  preference: preferenceReducer,
  dashboard: dashboard.reducer,
  ping: ping.reducer
});

export default rootReducer;