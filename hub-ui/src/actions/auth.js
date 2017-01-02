import axios from 'axios';
import cookie from 'react-cookie';
import { API_URL_ROOT, LOGIN_URL, GENERAL_ERROR, CLIENT_ROOT_URL, DEFAULT_SESSION_EXPIRATION_SECONDS, MAX_SESSION_EXPIRATION, errorHandler } from './index';
import * as ActionTypes from './types';

export const JWT_TOKEN_COOKIE_NAME = "jwtToken";

export function loginUser({ email, password, rememberMe }) {
  return function(dispatch) {
    //console.log('loginUser(...)', email, password, rememberMe, `${API_URL_ROOT}/auth/login`);
    //console.log(rememberMe === true);
    dispatch({ type: ActionTypes.AUTH_AJAX_INPROGRESS });
    axios.post(`${LOGIN_URL}`, { username: email, password: password })
      .then(response => {
        let cookieOpts = {
          path: '/',
          maxAge: rememberMe ? MAX_SESSION_EXPIRATION : DEFAULT_SESSION_EXPIRATION_SECONDS
        };

        cookie.save(JWT_TOKEN_COOKIE_NAME, response.data.token, cookieOpts);
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
    //console.log('registerUser(...)', email, firstName, lastName, password, `${API_URL_ROOT}/auth/register`);
    dispatch({ type: ActionTypes.AUTH_AJAX_INPROGRESS });
    axios.post(`${API_URL_ROOT}/auth/register`, { email: email, firstName: firstName, lastName: lastName, password: password })
      .then(response => {
        cookie.save(JWT_TOKEN_COOKIE_NAME, response.data.token, { path: '/', maxAge: DEFAULT_SESSION_EXPIRATION_SECONDS });
        // cookie.save('user', response.data.user, { path: '/', maxAge: DEFAULT_SESSION_EXPIRATION_SECONDS });
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
    cookie.remove(JWT_TOKEN_COOKIE_NAME, { path: '/' });
    // cookie.remove('user', { path: '/' });

    window.location.href = CLIENT_ROOT_URL + '/login';
  }
}