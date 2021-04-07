import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {store, persistor} from './state-management/index';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
