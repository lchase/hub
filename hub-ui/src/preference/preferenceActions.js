import common from '../common';
import * as keys from './preferenceKeys';

export const TOGGLE_SIDEBAR_REQUEST = 'TOGGLE_SIDEBAR_REQUEST';
export const TOGGLE_SIDEBAR_COMPLETE = 'TOGGLE_SIDEBAR_COMPLETE';
export const TOGGLE_SIDEBAR_ERROR = 'TOGGLE_SIDEBAR_ERROR';

export const LOAD_USER_PREFERENCES_REQUEST = 'LOAD_USER_PREFERENCES_REQUEST';
export const LOAD_USER_PREFERENCES_COMPLETE = 'LOAD_USER_PREFERENCES_COMPLETE';
export const LOAD_USER_PREFERENCES_ERROR = 'LOAD_USER_PREFERENCES_ERROR';

export const SAVE_USER_PREFERENCE_REQUEST = 'SAVE_USER_PREFERENCE_REQUEST';
export const SAVE_USER_PREFERENCE_COMPLETE = 'SAVE_USER_PREFERENCE_COMPLETE';
export const SAVE_USER_PREFERENCE_ERROR = 'SAVE_USER_PREFERENCE_ERROR';

const PREFERENCE_ENDPOINT = "preference";

export function loadPreferences(userId) {
  return function(dispatch) {
    dispatch({ type: LOAD_USER_PREFERENCES_REQUEST });

    common.actions.getData(LOAD_USER_PREFERENCES_COMPLETE, LOAD_USER_PREFERENCES_ERROR, true,
      `${common.actions.API_URL_ROOT}${PREFERENCE_ENDPOINT}`, dispatch);
  }
}

export function setPreference(preferences, preferenceName, newPreferenceValue, userId) {
  return function(dispatch) {
    dispatch({ type: LOAD_USER_PREFERENCES_REQUEST });

    common.actions.getData(LOAD_USER_PREFERENCES_COMPLETE, LOAD_USER_PREFERENCES_ERROR, true,
      `${common.actions.API_URL_ROOT}${PREFERENCE_ENDPOINT}`, dispatch);
  }
}

//TODO: this should probably be moved out of the general preference actions and into something more specifically
//related to the navigation/layout
export function toggleSidebar(preferences, expanded, userId) {
  return function(dispatch) {
    dispatch({ type: TOGGLE_SIDEBAR_REQUEST });

    let payload = {
      data: {
        type: "preference",
        attributes: {
          "name": keys.sidebarExpanded,
          "value": expanded,
          "userId": userId,
          "updatedAt": new Date()
        }
      }
    };

    if (preferences[keys.sidebarExpanded] !== undefined && preferences[keys.sidebarExpanded].id !== undefined) {
      common.actions.patchData(TOGGLE_SIDEBAR_COMPLETE, TOGGLE_SIDEBAR_ERROR,
        `${common.actions.API_URL_ROOT}${PREFERENCE_ENDPOINT}/${preferences[keys.sidebarExpanded].id}`, dispatch,
        payload);
    } else {
      payload.data.attributes.createdAt = new Date();
      common.actions.postData(TOGGLE_SIDEBAR_COMPLETE, TOGGLE_SIDEBAR_ERROR, true,
        `${common.actions.API_URL_ROOT}${PREFERENCE_ENDPOINT}`, dispatch, payload);
    }
  }
}
