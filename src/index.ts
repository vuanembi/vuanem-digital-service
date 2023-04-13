import { http } from '@google-cloud/functions-framework';
import express from 'express';
import cors from 'cors';

import { FacebookController } from './facebook/facebook.controller';
import { GoogleController } from './google/google.controller';
import { tawktoController } from './tawkto/tawkto.controller';

const app = express();

app.use(cors());
app.use(express.json());

app.use(({ url, params, body }, res, next) => {
    const log = { url, params, body };
    console.log(JSON.stringify(log));
    next();
});

app.use('/facebook', FacebookController);
app.use('/google', GoogleController);
app.use('/tawkto', tawktoController);

http('main', app);
