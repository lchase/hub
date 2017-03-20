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

        cookie.save(AuthConstants.HUB_JWT_TOKEN_COOKIE_NAME, response.data.token, cookieOpts);
        dispatch(authUser(email));
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
        cookie.save(AuthConstants.HUB_JWT_TOKEN_COOKIE_NAME, response.data.token, { path: '/', maxAge: AuthConstants.DEFAULT_SESSION_EXPIRATION_SECONDS });
        // cookie.save('user', response.data.user, { path: '/', maxAge: DEFAULT_SESSION_EXPIRATION_SECONDS });
        dispatch(authUser(email));
        window.location.href = BaseConstants.CLIENT_ROOT_URL;
      })
      .catch((error) => {
        BaseConstants.errorHandler(dispatch, error, ActionTypes.GENERAL_ERROR)
      });
  }
}

/**
 * Action Creator for the ActionTypes.AUTH_USER action.  Payload is the given email address.
 * @param userEmail - email address of the current user
 * @returns Object - ActionTypes.AUTH_USER action with the email address of the current user as the payload.
 */
export function authUser(userEmail) {
  console.log("authActions.authUser: ");
  console.log(user);
  return {
    type: ActionTypes.AUTH_USER,
    payload: {email: userEmail}
  }
}

/**
 * Action Creator for the ActionTypes.AUTH_USER action.  Payload is the email address portion of the given
 * JWT token.
 * @param token - encoded JWT token with the following format:
 *  audience:"web"
 *  created:1489983823278
 *  exp:1490588623
 *  sub:"a@a.com"
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
    payload: {email: decodedToken.sub}
  }
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: ActionTypes.UNAUTH_USER });
    cookie.remove(AuthConstants.HUB_JWT_TOKEN_COOKIE_NAME, { path: '/' });
    window.location.href = BaseConstants.LOGIN_URL;
  }
}