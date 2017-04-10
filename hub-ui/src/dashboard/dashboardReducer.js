import { LOAD_DEFAULT_DASHBOARD_COMPLETE, LOAD_DEFAULT_DASHBOARD_ERROR, LOAD_DEFAULT_DASHBOARD_REQUEST,
  SHOW_CREATE_DASHBOARD_DIALOG, HIDE_CREATE_DASHBOARD_DIALOG } from './dashboardActionTypes';
import objectAssign from 'object-assign';
import normalize from 'json-api-normalizer';

const INIT_STATE = {
  showCreateDashboardDialog: false
};

export default function (state = INIT_STATE, action) {
  console.log('dashboard_reducer', action.type);
  switch(action.type) {
    case SHOW_CREATE_DASHBOARD_DIALOG:
      return objectAssign({}, state, { showCreateDashboardDialog: true });
    case HIDE_CREATE_DASHBOARD_DIALOG:
      return objectAssign({}, state, { showCreateDashboardDialog: false });
    case LOAD_DEFAULT_DASHBOARD_REQUEST:
      //TODO: loading screen when loading dashboard data?
      return state;
    case LOAD_DEFAULT_DASHBOARD_COMPLETE:
      console.log('DashboardReducer LOAD_DEFAULT_DASHBOARD_COMPLETE: payload - ');
      console.log(action.payload);
      console.log('normalized payload: ');
      let normalized = normalize(action.payload);
      console.log(normalized);
      return objectAssign({}, state, { showCreateDashboardDialog: false });
    case LOAD_DEFAULT_DASHBOARD_ERROR:
      //TODO: error handling for dashboard API?
      return state;
  }

  return state;
}