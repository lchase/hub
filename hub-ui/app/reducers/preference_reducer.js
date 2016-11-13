import { LOAD_USER_PREFERENCES_COMPLETE } from '../actions/preference';
import objectAssign from 'object-assign';

const INIT_STATE = []

export default function (state = INIT_STATE, action) {
  switch(action.type) {
    case LOAD_USER_PREFERENCES_COMPLETE:
      return action.payload.data;
  }

  return state;
}