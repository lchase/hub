import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions';

var userReducer = (state = {}, action) => {
  if (action.type === USER_LOGGED_IN) {
    return action.payload;
  }
  if (action.type === USER_LOGGED_OUT) {
    return {}
  }
  return state;
}

const rootReducer = combineReducers({
  routing: routerReducer,
  form: FormReducer,
  user: userReducer
});

export default rootReducer;