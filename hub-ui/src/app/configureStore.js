import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import DevTools from './DevTools';
import reduxThunk from 'redux-thunk';
import { hashHistory } from 'react-router';

import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './rootEpic';

import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

//configure redux-observable middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

//configure react-router-redux middleware
const routingMiddleware = routerMiddleware(hashHistory);

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(reduxThunk, epicMiddleware, routingMiddleware),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
);

//FIXME: this is a wierd function.  The history depends on the store being present, but the store may depend on
//initial state getting passed in.  Which means history then depends on initialState.
export default function configureStoreAndRouterHistory(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  //FIXME: reducers are now located in modules separated by domain.  Need a way to locate all reducers (or maybe
  //we can just reference the rootReducer?

  // if (module.hot) {
  //   module.hot.accept('../reducers', () =>
  //     store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
  //   );
  // }

  const history = syncHistoryWithStore(hashHistory, store);

  return { store: store, history: history };
}