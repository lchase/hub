import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, PROTECTED_TEST, AUTH_AJAX_INPROGRESS } from '../actions/types';
import objectAssign from 'object-assign';

const INIT_STATE = {
  error: null,
  message: null,
  content: null,
  authenticated: false,
  ajaxInProgress: false,
  user: null
}

export default function (state = INIT_STATE, action) {
  switch(action.type) {
    case AUTH_AJAX_INPROGRESS:
      return objectAssign(state, { ajaxInProgress: true });
    case AUTH_USER:
      return objectAssign(state, { error: null, message: null, authenticated: true, ajaxInProgress: false, user: action.payload });
    case UNAUTH_USER:
      return objectAssign(state, { authenticated: false, ajaxInProgress: false });
    case AUTH_ERROR:
      return objectAssign(state, { error: action.payload, ajaxInProgress: false });
    case PROTECTED_TEST:
      return objectAssign(state, { content: action.payload, ajaxInProgress: false });
  }

  return state;
}