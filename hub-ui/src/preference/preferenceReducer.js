import { LOAD_USER_PREFERENCES_COMPLETE, TOGGLE_SIDEBAR_COMPLETE } from './preferenceActions';
import objectAssign from 'object-assign';

// State of user's preferences:
// {
//   preferenceOneName: {id: 1, value: 'preferenceOneValue'},
//   preferenceTwoName: {id: 2, value: 'preferenceTwoValue'},
//   ...
// }
const INIT_STATE = {};

export default function (state = INIT_STATE, action) {
  switch(action.type) {
    case LOAD_USER_PREFERENCES_COMPLETE:
      return objectAssign({}, state, formatLoadActionPayload(action.payload));
    case TOGGLE_SIDEBAR_COMPLETE:
      return objectAssign({}, state, formatSidebarActionPayload(action.payload));
  }

  return state;
}

function formatLoadActionPayload(payload) {
  let formattedPayload = {};
  payload.data.forEach(function(preference) {
    formattedPayload[preference.attributes.name] = {id: preference.id, value: preference.attributes.value};
  });
  return formattedPayload;
}

function formatSidebarActionPayload(payload) {
  console.log("sidebar action payload: ");
  console.log(payload);
  let formattedPayload = {};
  formattedPayload[payload.data.attributes.name] = {id: payload.data.id, value: payload.data.attributes.value};
  return formattedPayload;
}