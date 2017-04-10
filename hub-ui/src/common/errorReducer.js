import common from '../common';

const INIT_STATE = {
  errors: []
};

export default function (state = INIT_STATE, action) {
  switch(action.type) {
    case common.actions.GENERAL_ERROR:
      return errors.push(action.payload);
  }

  return state;
}