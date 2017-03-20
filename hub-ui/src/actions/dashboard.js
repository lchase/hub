 import { API_URL_ROOT, getData, postData } from './index';

export const LOAD_DEFAULT_DASHBOARD_REQUEST = 'LOAD_DEFAULT_DASHBOARD_REQUEST';
export const LOAD_DEFAULT_DASHBOARD_ERROR = 'LOAD_DEFAULT_DASHBOARD_ERROR';
export const LOAD_DEFAULT_DASHBOARD_COMPLETE = 'LOAD_DEFAULT_DASHBOARD_COMPLETE';
export const SHOW_CREATE_DASHBOARD_DIALOG = 'SHOW_CREATE_DASHBOARD_DIALOG';
export const HIDE_CREATE_DASHBOARD_DIALOG = 'HIDE_CREATE_DASHBOARD_DIALOG';

const DASHBOARD_ENDPOINT = "dashboard";

export function loadDefaultDashboard(email) {
  return function(dispatch) {
    dispatch({ type: LOAD_DEFAULT_DASHBOARD_REQUEST });

    getData(LOAD_DEFAULT_DASHBOARD_COMPLETE, LOAD_DEFAULT_DASHBOARD_ERROR, true,
      `${API_URL_ROOT}${DASHBOARD_ENDPOINT}?filter[dashboard][userEmail]=${email}&filter[dashboard][isDefault]=true`, dispatch);
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