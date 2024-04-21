import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import morgan from 'morgan';
import { syncDb } from './database/connection';
import { apiRouter } from './api/router';

const hostname = 'backend.hw.project';

const app = express();
const port = 8000;

const options = {
    key: fs.readFileSync('backend.hw.project-key.pem'),
    cert: fs.readFileSync('backend.hw.project.pem')
};

app.use(
    cors({
        origin: 'https://frontend.hw.project:8080'
    }),
    express.json(),
    morgan('dev')
);

app.use('/api', apiRouter);

app.get('/version', (_, res) => {
    res.json({
        name: 'Backend FH Project',
        version: '0.1.0'
    });
});

const initServer = async () => {
    await syncDb();
    https.createServer(options, app).listen(port, () => {
        console.log(`App listening on https://${hostname}:${port}/`);
    });
};

initServer().catch(e => {
    console.log(`Error: ${e}, initializing server`);
});
