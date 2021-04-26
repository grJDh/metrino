import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';

import mapReducer from './slices/map';
import metrinoReducer from './slices/metrino';

const rootReducer = combineReducers({
  map: mapReducer,
  metrino: metrinoReducer,
});

const store = configureStore({ reducer: rootReducer });

ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
