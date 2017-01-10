import 'rxjs';
import { PING, PONG } from './pingActionTypes';

//This type of arrow function (with only a single statement) has an implicit return and thus will
//return an observable
export const epic = action$ =>
  action$.ofType(PING)
    .delay(1000)
    .mapTo({ type: PONG });