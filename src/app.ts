import express from 'express';
import https from 'https';
import fs from 'fs';

const hostname = "backend.hw.project";

const app = express();
const port = 3000;

const options = {
    key: fs.readFileSync('backend.hw.project-key.pem'),
    cert: fs.readFileSync('backend.hw.project.pem'),
};

app.use(express.json());

app.get('/', (_, res) => {
    res.json({
        name: 'Backend FH Project',
        version: '0.1.0',
    });
})

https.createServer(options, app).listen(port, () => {
    console.log(`App listening on https://${hostname}:${port}/`);
});
