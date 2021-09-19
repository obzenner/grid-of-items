import path from 'path';
import fs from 'fs';
import express, { NextFunction, Request, Response } from 'express';

// React
import * as React from 'react';
import Ninjas from '../src/components/Ninjas';
import getNinjasData from '../ninjasData/getNinjasData';
import { renderToString } from 'react-dom/server';
import indexHtml from '../server/indexHtml';

const app = express();
const port = process.env.PORT || 3000;

// app constants
const CLIENT_STATIC_DIR = path.join(__dirname, '../client');

app.use('/static', express.static(CLIENT_STATIC_DIR));

// Ninjas API for clients
app.get('/api', async (req: Request, res: Response, next: NextFunction) => {
    const ninjasData = getNinjasData();
    if (ninjasData !== '{}') {
        res.send(JSON.parse(ninjasData))
    } else {
        next('Data file is empty. Please generate fresh data!')
    }
});

app.get('/', (req: Request, res: Response) => {
    const ninjasData = getNinjasData();

    const rootComponent = renderToString(<Ninjas data={JSON.parse(ninjasData)} />);
    const html = indexHtml(rootComponent, ninjasData)

    res.send(html);
});

app.listen(port, () => {
    console.log('App listening on port: ' + port);
});