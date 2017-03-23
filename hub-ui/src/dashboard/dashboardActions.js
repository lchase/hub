import axios from 'axios';
import cookie from 'react-cookie';
import * as BaseConstants from '../actions';
import * as ActionTypes from './DashboardActionTypes';

export function loadDefaultDashboard(email) {
  return function(dispatch) {
    console.log('loadDefaultDashboard(...)', email, `${BaseConstants.API_URL_ROOT}/dashboard`);
    dispatch({ type: ActionTypes.LOAD_DEFAULT_DASHBOARD_REQUEST });

    /* email is the id */
    axios.get(`${BaseConstants.API_URL_ROOT}/dashboard`, { email: email })
      .then(response => {
        dispatch({ type: ActionTypes.LOAD_DEFAULT_DASHBOARD_COMPLETE, payload: response.data });
      })
      .catch((error) => {
        errorHandler(dispatch, error, ActionTypes.LOAD_DEFAULT_DASHBOARD_ERROR)
      });
  }
}

export function showCreateDashboardDialog() {
  return {
    type: ActionTypes.SHOW_CREATE_DASHBOARD_DIALOG
  }
}

export function hideCreateDashboardDialog() {
  return {
    type: ActionTypes.HIDE_CREATE_DASHBOARD_DIALOG
  }
}