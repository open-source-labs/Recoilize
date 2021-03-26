import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {store} from './state-management/index';
import {Provider} from 'react-redux';

console.log('main app store', store);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
