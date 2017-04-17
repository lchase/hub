import auth from '../auth';
import axios from 'axios';
import cookie from 'react-cookie';

//TODO: remove this to configuration
export const SERVER_URL_ROOT = 'http://localhost:8090/';
export const API_URL_ROOT = SERVER_URL_ROOT + 'api/';
export const CLIENT_ROOT_URL = 'http://localhost:4001/';
export const LOGIN_URL = SERVER_URL_ROOT + 'auth/login/';
export const REGISTRATION_URL = SERVER_URL_ROOT + 'auth/register/';

/* utility function for error response */
export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if (error.data) {
    if (error.data.error) {
      errorMessage = error.data.error;
    } else {
      errorMessage = error.data;
    }
  } else {
    errorMessage = error;
  }

  if (error.status === 401) {
    dispatch({ 
      type: type, 
      payload: 'You are not authorized to do this. Please login and try again.' 
    });
    auth.actions.logoutUser();
  } else {
    dispatch({ 
      type: type, 
      payload: errorMessage 
    });
  }
}

export function postData(action, errorType, isAuthReq, url, dispatch, data) {
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { 'Authorization': cookie.load(auth.constants.HUB_JWT_TOKEN_COOKIE_NAME) } };
  }

  axios.post(url, data, headers)
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType)
    })
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data
      });
    });
}

export function getData(action, errorType, isAuthReq, url, dispatch) {
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { 'Authorization': cookie.load(auth.constants.HUB_JWT_TOKEN_COOKIE_NAME) } };
  }

  axios.get(url, headers)
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType)
    })
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data
      });
    });
}

// Patch Request
export function patchData(action, errorType, url, dispatch, data) {
  let headers = { headers: { 'Authorization': cookie.load(auth.constants.HUB_JWT_TOKEN_COOKIE_NAME) } };

  axios.patch(url, data, headers)
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType)
    })
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data
      });
    })
}

// Delete Request
export function deleteData(action, errorType, url, dispatch) {
  const requestUrl = API_URL_ROOT + url;

  let headers = {headers: { 'Authorization': cookie.load(auth.constants.HUB_JWT_TOKEN_COOKIE_NAME) }};

  axios.delete(requestUrl, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType)
  });
}