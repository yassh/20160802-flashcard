import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../modules/reducers.js';
import App from '../modules/App.jsx';

let store = createStore(reducer, applyMiddleware(thunk));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

// setInterval(() => console.log(store.getState()), 2000);
