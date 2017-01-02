import { errorHandler, API_URL_ROOT, getData, postData } from './index';
import axios from 'axios';

export const TOGGLE_SIDEBAR_REQUEST = 'TOGGLE_SIDEBAR_REQUEST';
export const TOGGLE_SIDEBAR_COMPLETE = 'TOGGLE_SIDEBAR_COMPLETE';
export const TOGGLE_SIDEBAR_ERROR = 'TOGGLE_SIDEBAR_ERROR';

export const LOAD_USER_PREFERENCES_REQUEST = 'LOAD_USER_PREFERENCES_REQUEST';
export const LOAD_USER_PREFERENCES_COMPLETE = 'LOAD_USER_PREFERENCES_COMPLETE';
export const LOAD_USER_PREFERENCES_ERROR = 'LOAD_USER_PREFERENCES_ERROR';

export function loadPreferences(userId) {
  return function(dispatch) {
    //console.log('registerUser(...)', email, firstName, lastName, password, `${API_URL_ROOT}/auth/register`);
    dispatch({ type: LOAD_USER_PREFERENCES_REQUEST });

    getData(LOAD_USER_PREFERENCES_COMPLETE, LOAD_USER_PREFERENCES_ERROR, true,
      `${API_URL_ROOT}preference/user/${userId}`, dispatch);
  }
}

export function toggleSidebar(expanded, userId) {
  return function(dispatch) {
    //console.log('registerUser(...)', email, firstName, lastName, password, `${API_URL_ROOT}/auth/register`);
    dispatch({ type: TOGGLE_SIDEBAR_REQUEST });

    let payload = { 
      data: {
        type: "preferences",
        attributes: {
          "name": "sidebar-expanded",
          "value": expanded,
          "user-id": userId
        }
      }
    };
    console.log(payload);
    axios.post(`${API_URL_ROOT}/preference`, payload)
    .then(response => {
      dispatch({ type: TOGGLE_SIDEBAR_COMPLETE, payload: response.data });
    })
    .catch((error) => {
      errorHandler(dispatch, error, TOGGLE_SIDEBAR_ERROR)
    });
  }
}
