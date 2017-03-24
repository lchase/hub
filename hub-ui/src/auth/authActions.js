import axios from 'axios';
import cookie from 'react-cookie';
import * as BaseConstants from '../actions';
import * as AuthConstants from './authConstants';
import * as ActionTypes from './authActionTypes';

function getCookieOptions(rememberMe) {
  return {
    path: '/',
    maxAge: rememberMe ? AuthConstants.MAX_SESSION_EXPIRATION : AuthConstants.DEFAULT_SESSION_EXPIRATION_SECONDS
  };
}

export function loginUser({ email, password, rememberMe }) {
  return function(dispatch) {
    //console.log('loginUser(...)', email, password, rememberMe, `${API_URL_ROOT}/auth/login`);
    dispatch({ type: ActionTypes.AUTH_AJAX_IN_PROGRESS });
    axios.post(`${BaseConstants.LOGIN_URL}`, { email: email, password: password })
      .then(response => {
        console.log('login user', response.data);
        cookie.save(AuthConstants.HUB_JWT_TOKEN_COOKIE_NAME, response.data.token, getCookieOptions(rememberMe));
        dispatch(authUserFromToken(response.data.token));
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
        cookie.save(AuthConstants.HUB_JWT_TOKEN_COOKIE_NAME, response.data.token, getCookieOptions());
        dispatch({ type: ActionTypes.AUTH_USER });
        window.location.href = BaseConstants.CLIENT_ROOT_URL;
      })
      .catch((error) => {
        BaseConstants.errorHandler(dispatch, error, ActionTypes.GENERAL_ERROR)
      });
  }
}

/**
 * Action Creator for the ActionTypes.AUTH_USER action.  Payload is the email address and user id portion of the given
 * JWT token.
 * @param token - encoded JWT token with the following format:
 *  audience:"web"
 *  created:1489983823278
 *  exp:1490588623
 *  sub:"a@a.com"
 *  uid:-1
 *
 *  For now, we only care about the "sub" portion corresponding to the user's email address, but we may add
 *  more user data to the token in the future.
 * @returns Object - ActionTypes.AUTH_USER action with the email address of the current user as the payload.
 */
export function authUserFromToken(token) {
  console.log("authActions.authUserFromToken: ");
  console.log(token);

  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace('-', '+').replace('_', '/');
  let decodedToken = JSON.parse(window.atob(base64));

  console.log("authActions.decodedToken: ");
  console.log(decodedToken);

  return {
    type: ActionTypes.AUTH_USER,
    payload: { email: decodedToken.sub, id: decodedToken.uid }
  }
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: ActionTypes.UNAUTH_USER });
    cookie.remove(AuthConstants.HUB_JWT_TOKEN_COOKIE_NAME, { path: '/' });
    window.location.href = BaseConstants.LOGIN_URL;
  }
}