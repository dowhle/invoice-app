import {createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import reducer from './reducers/index';

const sagaMiddleware = createSagaMiddleware();
export default function configureStore(history) {
  const store = createStore(
    reducer,
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history)
    )
  );
  store.runSaga = sagaMiddleware.run;
  return store;
}

