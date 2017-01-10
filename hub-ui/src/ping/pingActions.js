import * as types from './pingActionTypes';

export const ping = () => ({
  type: types.PING,
  payload: {  }
});

export const pong = () => ({
  type: types.PONG,
  payload: {  }
});