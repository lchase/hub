import * as ActionTypes from './types';

import { logoutUser } from './auth';

import axios from 'axios';
import cookie from 'react-cookie';

export const DEFAULT_SESSION_EXPIRATION_SECONDS = 60 * 60;  // 1 hour
export const MAX_SESSION_EXPIRATION = 365 * 24 * 60 * 60;  // 1 Year

export const API_URL = 'http://localhost:4000/api'; //TODO: remove this to configuration.
export const CLIENT_ROOT_URL = 'http://localhost:4001/';

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
    logoutUser();
  } else {
    dispatch({ 
      type: type, 
      payload: errorMessage 
    });
  }
}

export function postData(action, errorType, isAuthReq, url, dispatch, data) {
  const requestUrl = API_URL + url;
  let headers = {};

  if(isAuthReq) {
    headers = {headers: { 'Authorization': cookie.load('token') }};
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

// Get Request
export function getData(action, errorType, isAuthReq, url, dispatch) {
  const requestUrl = API_URL + url;
  let headers = {};

  if(isAuthReq) {
    headers = {headers: { 'Authorization': cookie.load('token') }};
  }

  axios.get(requestUrl, headers)
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
  const requestUrl = API_URL + url;
  let headers = {};

  if(isAuthReq) {
    headers = {headers: { 'Authorization': cookie.load('token') }};
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
  const requestUrl = API_URL + url;
  let headers = {};

  if(isAuthReq) {
    headers = {headers: { 'Authorization': cookie.load('token') }};
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



export function protectedTest() {
  return function(dispatch) {
    axios.get(`${API_URL}/protected`, {
      headers: { 'Authorization': cookie.load('token') }
    })
    .then(response => {
      dispatch({
        type: ActionTypes.PROTECTED_TEST,
        payload: response.data.content
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, ActionTypes.AUTH_ERROR)
    });
  }
}