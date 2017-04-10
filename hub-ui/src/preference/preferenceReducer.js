import { LOAD_USER_PREFERENCES_COMPLETE } from './preferenceActions';

const INIT_STATE = [];

export default function (state = INIT_STATE, action) {
  switch(action.type) {
    case LOAD_USER_PREFERENCES_COMPLETE:
      return action.payload.data;
  }

  return state;
}