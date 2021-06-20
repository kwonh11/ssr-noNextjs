import express from 'express';
import fs from 'fs';
import path from 'path';
import {renderToString} from 'react-dom/server';
import React from 'react';
import App from './App';
import * as url from 'url';
import {ServerStyleSheet} from 'styled-components';
import store from './redux/store';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import rootReducer from './redux/reducer';

const app = express();
const html = fs.readFileSync(
    path.resolve(__dirname, '../dist/index.html'),
    'utf-8'
);
app.use('/dist', express.static('dist'));
app.get('/favicon.ico', (req,res) => res.sendStatus(204));
app.get("*", (req,res) => {

    const store = createStore(rootReducer);
    const parsedUrl = url.parse(req.url, true);
    const page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : 'home';
    
    const sheet = new ServerStyleSheet();
    
    try {
        // const renderString = renderToString(sheet.collectStyles(sheetMui.collect(<App data={page} />)));
        const renderString = renderToString(sheet.collectStyles(
            <Provider store={store}>
                <App data={page} />
            </Provider>
        ));

        const preloadedState = JSON.stringify(store.getState());
        console.log(preloadedState);
        const styles = sheet.getStyleTags();
        const initialData = {page};

        const result = html
        .replace(
            '<div id="root"></div>',
            `<div id="root">${renderString}</div>`
        ).replace('__DATA_FROM_SERVER__', JSON.stringify(initialData))
        .replace('__STYLE_FROM_SERVER__', styles)
        .replace('__REDUX_STATE_FROM_SERVER__', preloadedState);

        res.send(result);

    } catch(err) {
        console.error(err)
    } finally {
        sheet.seal();
    }
});

app.listen(3000, () => {
    console.log("----- port 3000")
});