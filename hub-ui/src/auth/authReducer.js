import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_AJAX_IN_PROGRESS } from './authActionTypes';
import objectAssign from 'object-assign';

const INIT_STATE = {
  error: null,
  message: null,
  content: null,
  authenticated: false,
  ajaxInProgress: false,
  user: null
};

export default function (state = INIT_STATE, action) {
  switch(action.type) {
    case AUTH_AJAX_IN_PROGRESS:
      return objectAssign(state, { ajaxInProgress: true });
    case AUTH_USER:
      console.log(action.payload);
      return objectAssign(state, { error: null, message: null, authenticated: true, ajaxInProgress: false, user: action.payload });
    case UNAUTH_USER:
      return objectAssign(state, { authenticated: false, ajaxInProgress: false });
    case AUTH_ERROR:
      return objectAssign(state, { error: action.payload, ajaxInProgress: false });
  }

  return state;
}