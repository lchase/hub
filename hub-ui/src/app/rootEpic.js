import { combineEpics } from 'redux-observable';
import ping from '../ping';

export const rootEpic = combineEpics(
  ping.epic
);