import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './redux/reducer';

const initialData = window.__INITIAL_DATA__;
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = createStore(rootReducer, preloadedState);

ReactDom.hydrate(
    <Provider store={store}>
        <App data={initialData} />
    </Provider>
    , document.getElementById('root'));