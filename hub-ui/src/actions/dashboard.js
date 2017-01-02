import axios from 'axios';
import { errorHandler, API_URL_ROOT } from './index';

export const LOAD_DEFAULT_DASHBOARD_REQUEST = 'LOAD_DEFAULT_DASHBOARD_REQUEST';
export const LOAD_DEFAULT_DASHBOARD_ERROR = 'LOAD_DEFAULT_DASHBOARD_ERROR';
export const LOAD_DEFAULT_DASHBOARD_COMPLETE = 'LOAD_DEFAULT_DASHBOARD_COMPLETE';
export const SHOW_CREATE_DASHBOARD_DIALOG = 'SHOW_CREATE_DASHBOARD_DIALOG';
export const HIDE_CREATE_DASHBOARD_DIALOG = 'HIDE_CREATE_DASHBOARD_DIALOG';

export function loadDefaultDashboard(email) {
  return function(dispatch) {
    //console.log('registerUser(...)', email, firstName, lastName, password, `${API_URL_ROOT}/auth/register`);
    dispatch({ type: LOAD_DEFAULT_DASHBOARD_REQUEST });

    /* email is the id */
    axios.get(`${API_URL_ROOT}/dashboard`, { email: email })
      .then(response => {
        dispatch({ type: LOAD_DEFAULT_DASHBOARD_COMPLETE, payload: response.data });
      })
      .catch((error) => {
        errorHandler(dispatch, error, LOAD_DEFAULT_DASHBOARD_ERROR)
      });
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