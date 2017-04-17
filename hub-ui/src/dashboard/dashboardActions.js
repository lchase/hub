//import { getData, API_URL_ROOT } from '../actions';
import common from '../common';

export const LOAD_DEFAULT_DASHBOARD_REQUEST = 'LOAD_DEFAULT_DASHBOARD_REQUEST';
export const LOAD_DEFAULT_DASHBOARD_ERROR = 'LOAD_DEFAULT_DASHBOARD_ERROR';
export const LOAD_DEFAULT_DASHBOARD_COMPLETE = 'LOAD_DEFAULT_DASHBOARD_COMPLETE';
export const SHOW_CREATE_DASHBOARD_DIALOG = 'SHOW_CREATE_DASHBOARD_DIALOG';
export const HIDE_CREATE_DASHBOARD_DIALOG = 'HIDE_CREATE_DASHBOARD_DIALOG';

const DASHBOARD_ENDPOINT = "dashboard";

export function loadDefaultDashboard(email) {
  return function(dispatch) {
    dispatch({ type: LOAD_DEFAULT_DASHBOARD_REQUEST });

    common.actions.getData(LOAD_DEFAULT_DASHBOARD_COMPLETE, LOAD_DEFAULT_DASHBOARD_ERROR, true,
      `${common.actions.API_URL_ROOT}${DASHBOARD_ENDPOINT}?include[dashboard]=user&include[dashboard]=widgets`, dispatch);
  }
}

export function showCreateDashboardDialog() {
  return {
    type: SHOW_CREATE_DASHBOARD_DIALOG
  }
}

export function hideCreateDashboardDialog() {
  return {
    type: HIDE_CREATE_DASHBOARD_DIALOG
  }
}