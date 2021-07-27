import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../utils/rootReducer';
import rootSaga from '../utils/rootSaga';

const sagaMiddleWare = createSagaMiddleware();

export function createRootStore() {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
  sagaMiddleWare.run(rootSaga);

  return store;
}
