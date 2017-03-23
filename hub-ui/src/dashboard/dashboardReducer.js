import { LOAD_DEFAULT_DASHBOARD_COMPLETE, SHOW_CREATE_DASHBOARD_DIALOG, HIDE_CREATE_DASHBOARD_DIALOG } from './dashboardActionTypes';
import objectAssign from 'object-assign';

const INIT_STATE = {
  showCreateDashboardDialog: false
}

export default function (state = INIT_STATE, action) {
  console.log('dashboard_reducer', action.type);
  switch(action.type) {
    case SHOW_CREATE_DASHBOARD_DIALOG:
      return objectAssign({}, state, { showCreateDashboardDialog: true });
    case HIDE_CREATE_DASHBOARD_DIALOG:
      return objectAssign({}, state, { showCreateDashboardDialog: false });
  }

  return state;
}