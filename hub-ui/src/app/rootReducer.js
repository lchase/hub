import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import auth from '../auth';
import errorReducer from '../common/errorReducer';
import preference from '../preference';
import dashboard from '../dashboard';
import qualityCenter from '../qualitycenter';

import ping from '../ping';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  auth: auth.reducer,
  errors: errorReducer,
  preference: preference.reducer,
  dashboard: dashboard.reducer,
  ping: ping.reducer,
  qualityCenter: qualityCenter.reducer
});

export default rootReducer;