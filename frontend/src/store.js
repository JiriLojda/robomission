import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { getLocalizationSetting } from './localization';
import rootReducer from './reducers';
import rootSaga from './sagas';

const getReduxDevtoolsCompose = () => window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const deepCopy = i => JSON.parse(JSON.stringify(i));
export function createFlocsStore(initialState) {
  const initialStateWithLocalization = deepCopy(initialState);
  // const initialStateWithLocalization = {
  //   ...initialState,
  //   intl: getLocalizationSetting(),
  // };
  // // const sagaMiddleware = createSagaMiddleware();
  const middlewares = [];
  if (process.env.NODE_ENV === 'development' && !getReduxDevtoolsCompose()) {
    const logger = createLogger();
    middlewares.push(logger);
  }

  const composeEnhancers = process.env.NODE_ENV === 'development' && getReduxDevtoolsCompose()
      ? getReduxDevtoolsCompose()
      : compose;

  const middleware = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, initialStateWithLocalization, middleware);
  // sagaMiddleware.run(rootSaga);
  return store;
}
