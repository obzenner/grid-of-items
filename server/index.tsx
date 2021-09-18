import path from 'path';
import * as React from 'react';
import express, { Request, Response, NextFunction } from 'express';
import { renderToString } from 'react-dom/server';

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../../dist/client');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

interface mockProps { foo: string, bar: string }
const mockResponse: mockProps = {
    foo: 'bar',
    bar: 'foo'
};

app.use(express.static(DIST_DIR));

app.get('/api', (req: Request, res: Response) => {
    res.send(mockResponse);
});

app.get('/', (req: Request, res: Response) => {
    res.sendFile(HTML_FILE);
});

app.listen(port, function () {
    console.log('App listening on port: ' + port);
});