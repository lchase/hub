import common from '../common';
import * as actionTypes from './qualityCenterActionTypes';

const QC_QUERY_ENDPOINT = "qualityCenterQuery";

export function loadQcQueries() {
  return function(dispatch) {
    dispatch({ type: actionTypes.LOAD_QC_QUERIES_REQUEST });

    common.actions.getData(actionTypes.LOAD_QC_QUERIES_COMPLETE, actionTypes.LOAD_QC_QUERIES_ERROR, true,
      `${common.actions.API_URL_ROOT}${QC_QUERY_ENDPOINT}?include[qualityCenterQuery]=components`, dispatch);
  }
}