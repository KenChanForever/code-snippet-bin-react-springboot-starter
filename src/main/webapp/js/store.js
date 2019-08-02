import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/RootReducer';


function configureStore(initialState) {
  const logger = createLogger();
  const middleware = [
    thunkMiddleware,
    logger,
  ].filter(Boolean);
  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
  ));
}

export const store = configureStore();
