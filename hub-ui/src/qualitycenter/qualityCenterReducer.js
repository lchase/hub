import * as actionTypes from './qualityCenterActionTypes';
import objectAssign from 'object-assign';
import normalize from 'json-api-normalizer';

const INIT_STATE = {
  //A list of quality center queries visible to the user
  queries: {},
  queryComponents: {},
  isLoaded: false
};

export default function (state = INIT_STATE, action) {
  switch (action.type) {
    case actionTypes.LOAD_QC_QUERIES_REQUEST:
      //TODO: show loading screen?
      return state;

    case actionTypes.LOAD_QC_QUERIES_COMPLETE:
      console.log('qualityCenterReducer LOAD_QC_QUERIES_COMPLETE: payload - ');
      console.log(action.payload);
      console.log('normalized payload: ');
      let normalized = normalize(action.payload);
      console.log(normalized);
      return objectAssign({}, state,
        {
          queries: normalized.qualityCenterQuery,
          queryComponents: normalized.qualityCenterQueryComponent,
          isLoaded: true
        });

    default:
      return state;
  }
}