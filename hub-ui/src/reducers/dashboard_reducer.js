import { SHOW_CREATE_DASHBOARD_DIALOG, HIDE_CREATE_DASHBOARD_DIALOG } from '../actions/dashboard';
import objectAssign from 'object-assign';

const INIT_STATE = {
  showCreateDashboardDialog: false
}

export default function (state = INIT_STATE, action) {
  switch(action.type) {
    case SHOW_CREATE_DASHBOARD_DIALOG:
      return objectAssign({}, state, { showCreateDashboardDialog: true });
    case HIDE_CREATE_DASHBOARD_DIALOG:
      return objectAssign({}, state, { showCreateDashboardDialog: false });
  }

  return state;
}