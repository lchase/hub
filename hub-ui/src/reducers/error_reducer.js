import { GENERAL_ERROR } from '../actions/types';
import objectAssign from 'object-assign';

const INIT_STATE = {
  errors: []
}

export default function (state = INIT_STATE, action) {
  switch(action.type) {
    case GENERAL_ERROR:
      return errors.push(action.payload);
  }

  return state;
}