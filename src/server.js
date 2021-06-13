import express from 'express';
import fs from 'fs';
import path from 'path';
import {renderToString} from 'react-dom/server';
import React from 'react';
import App from './App';
import * as url from 'url';
import {ServerStyleSheet} from 'styled-components';
import { ServerStyleSheets as ServerStyleSheetMui } from "@material-ui/core/styles";

const app = express();
const html = fs.readFileSync(
    path.resolve(__dirname, '../dist/index.html'),
    'utf-8'
);
app.use('/dist', express.static('dist'));
app.get('/favicon.ico', (req,res) => res.sendStatus(204));
app.get("*", (req,res) => {
    const parsedUrl = url.parse(req.url, true);
    const page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : 'home';
    
    const sheet = new ServerStyleSheet();
    const sheetMui = new ServerStyleSheetMui();

    try {
        const renderString = renderToString(sheet.collectStyles(sheetMui.collect(<App data={page} />)));

        const styles = sheet.getStyleTags();
        const initialData = {page};

        const result = html
        .replace(
            '<div id="root"></div>',
            `<div id="root">${renderString}</div>`
        ).replace('__DATA_FROM_SERVER__', JSON.stringify(initialData))
        .replace('__STYLE_FROM_SERVER__', styles);
        res.send(result);
    } catch(err) {
        console.error(err)
    } finally {
        sheet.seal();
    }
});

app.listen(3000);