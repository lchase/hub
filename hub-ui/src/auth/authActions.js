import axios from 'axios';
import cookie from 'react-cookie';
import * as BaseConstants from '../actions';
import * as AuthConstants from './authConstants';
import * as ActionTypes from './authActionTypes';

export function loginUser({ email, password, rememberMe }) {
  return function(dispatch) {
    //console.log('loginUser(...)', email, password, rememberMe, `${API_URL_ROOT}/auth/login`);
    dispatch({ type: ActionTypes.AUTH_AJAX_IN_PROGRESS });
    axios.post(`${BaseConstants.LOGIN_URL}`, { email: email, password: password })
      .then(response => {
        let cookieOpts = {
          path: '/',
          maxAge: rememberMe ? AuthConstants.MAX_SESSION_EXPIRATION : AuthConstants.DEFAULT_SESSION_EXPIRATION_SECONDS
        };

        cookie.save(AuthConstants.JWT_TOKEN_COOKIE_NAME, response.data.token, cookieOpts);
        dispatch({ type: ActionTypes.AUTH_USER });
        window.location.href = BaseConstants.CLIENT_ROOT_URL;
      })
      .catch((error) => {
        BaseConstants.errorHandler(dispatch, error.response, ActionTypes.AUTH_ERROR);
      })
  }
}

export function registerUser({ email, firstName, lastName, password }) {
  return function(dispatch) {
    //console.log('registerUser(...)', email, firstName, lastName, password, `${API_URL_ROOT}/auth/register`);
    dispatch({ type: ActionTypes.AUTH_AJAX_IN_PROGRESS });
    axios.post(`${BaseConstants.REGISTRATION_URL}`, { email: email, firstName: firstName, lastName: lastName, password: password })
      .then(response => {
        cookie.save(AuthConstants.JWT_TOKEN_COOKIE_NAME, response.data.token, { path: '/', maxAge: AuthConstants.DEFAULT_SESSION_EXPIRATION_SECONDS });
        // cookie.save('user', response.data.user, { path: '/', maxAge: DEFAULT_SESSION_EXPIRATION_SECONDS });
        dispatch({ type: ActionTypes.AUTH_USER });
        window.location.href = BaseConstants.CLIENT_ROOT_URL;
      })
      .catch((error) => {
        BaseConstants.errorHandler(dispatch, error, ActionTypes.GENERAL_ERROR)
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
    cookie.remove(AuthConstants.JWT_TOKEN_COOKIE_NAME, { path: '/' });
    // cookie.remove('user', { path: '/' });

    window.location.href = BaseConstants.LOGIN_URL;
  }
}