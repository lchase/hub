import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import errorReducer from './error_reducer';
import preferenceReducer from './preference_reducer';
import dashboardReducer from './dashboard_reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  auth: authReducer,
  errors: errorReducer,
  preference: preferenceReducer,
  dashboard: dashboardReducer
});

export default rootReducer;