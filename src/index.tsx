import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {thunk} from 'redux-thunk';
import rootReducer from './redux/reducers';
import rootSaga from './redux/sagas';
import App from './App';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['core'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [thunk, sagaMiddleware],
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

function Root() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

export default Root;
