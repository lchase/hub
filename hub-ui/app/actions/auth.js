import axios from 'axios';
import cookie from 'react-cookie';
import { API_URL, GENERAL_ERROR, CLIENT_ROOT_URL, DEFAULT_SESSION_EXPIRATION_SECONDS, MAX_SESSION_EXPIRATION, errorHandler } from './index';
import * as ActionTypes from './types';

export function loginUser({ email, password, rememberMe }) {
  return function(dispatch) {
    //console.log('loginUser(...)', email, password, rememberMe, `${API_URL}/auth/login`);
    //console.log(rememberMe === true);
    dispatch({ type: ActionTypes.AUTH_AJAX_INPROGRESS });
    axios.post(`${API_URL}/auth/login`, { email: email, password: password })
      .then(response => {
        let cookieOpts = { 
          path: '/', 
          maxAge: rememberMe ? MAX_SESSION_EXPIRATION : DEFAULT_SESSION_EXPIRATION_SECONDS 
        };

        cookie.save('token', response.data.token, cookieOpts);
        cookie.save('user', response.data.user, cookieOpts);
        dispatch({ type: ActionTypes.AUTH_USER });
        window.location.href = CLIENT_ROOT_URL;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, ActionTypes.AUTH_ERROR);
      })
  }
}

export function registerUser({ email, firstName, lastName, password }) {
  return function(dispatch) {
    //console.log('registerUser(...)', email, firstName, lastName, password, `${API_URL}/auth/register`);
    dispatch({ type: ActionTypes.AUTH_AJAX_INPROGRESS });
    axios.post(`${API_URL}/auth/register`, { email: email, firstName: firstName, lastName: lastName, password: password })
      .then(response => {
        cookie.save('token', response.data.token, { path: '/', maxAge: DEFAULT_SESSION_EXPIRATION_SECONDS });
        cookie.save('user', response.data.user, { path: '/', maxAge: DEFAULT_SESSION_EXPIRATION_SECONDS });
        dispatch({ type: ActionTypes.AUTH_USER });
        window.location.href = CLIENT_ROOT_URL;
      })
      .catch((error) => {
        errorHandler(dispatch, error, ActionTypes.GENERAL_ERROR)
      });
  }
}

export function authUser(user) {
  return {
    type: ActionTypes.AUTH_USER,
    payload: user
  }
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: ActionTypes.UNAUTH_USER });
    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });

    window.location.href = CLIENT_ROOT_URL + '/login';
  }
}