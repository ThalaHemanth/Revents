/*  global require */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';

import firebase from '../config/firebase';
import rootReducer from '../reducers/rootReducer';

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false,
};

export const configureStore = preloadedState => {
  const middlewares = [thunk.withExtraArgument({ getFirestore, getFirebase })];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancer = [middlewareEnhancer];
  const composeEnhancer = composeWithDevTools(
    ...storeEnhancer,
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, preloadedState, composeEnhancer);
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducers/rootReducer.js', () => {
        const newReducer = require('../reducers/rootReducer').default; // eslint-disable-line
        store.replaceReducer(newReducer);
      });
    }
  }
  return store;
};
