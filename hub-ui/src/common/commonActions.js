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
  const requestUrl = API_URL_ROOT + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { 'Authorization': cookie.load(auth.constants.HUB_JWT_TOKEN_COOKIE_NAME) } };
  }

  axios.post(requestUrl, data, headers)
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

export function getData(action, errorType, isAuthReq, url, dispatch) {
  //const requestUrl = API_URL_ROOT + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { 'Authorization': cookie.load(auth.constants.HUB_JWT_TOKEN_COOKIE_NAME) } };
  }

  axios.get(url, headers)
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

// Put Request
export function putData(action, errorType, isAuthReq, url, dispatch, data) {
  const requestUrl = API_URL_ROOT + url;
  let headers = {};

  if (isAuthReq) {
    headers = {headers: { 'Authorization': cookie.load(auth.constants.HUB_JWT_TOKEN_COOKIE_NAME) }};
  }

  axios.put(requestUrl, data, headers)
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

// Delete Request
export function deleteData(action, errorType, isAuthReq, url, dispatch) {
  const requestUrl = API_URL_ROOT + url;
  let headers = {};

  if(isAuthReq) {
    headers = {headers: { 'Authorization': cookie.load(auth.constants.HUB_JWT_TOKEN_COOKIE_NAME) }};
  }

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