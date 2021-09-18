import path from 'path';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../../dist/client');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

interface MockProps { foo: string, bar: string }
const mockResponse: MockProps = {
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

app.listen(port, () => {
    console.log('App listening on port: ' + port);
});