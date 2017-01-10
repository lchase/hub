//import * as BaseConstants from '../actions';

export const JWT_TOKEN_COOKIE_NAME = "jwtToken";

export const DEFAULT_SESSION_EXPIRATION_SECONDS = 60 * 60;  // 1 hour
export const MAX_SESSION_EXPIRATION = 365 * 24 * 60 * 60;  // 1 Year

//Moved to ../actions/index.js as the BaseConstants reference was not working when
//referenced from this file for some reason.
// export const LOGIN_URL = BaseConstants.SERVER_URL_ROOT + 'auth/login/';
// export const REGISTRATION_URL = BaseConstants.SERVER_URL_ROOT + 'auth/register/';