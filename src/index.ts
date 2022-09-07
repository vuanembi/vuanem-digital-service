import { http } from '@google-cloud/functions-framework';
import express from 'express';
import cors from 'cors';

import { facebookController } from './facebook/facebook.controller';
import { googleController } from './google/google.controller';
import { tawktoController } from './tawkto/tawkto.controller';

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log({
        url: req.url,
        params: req.params,
        body: req.body,
    });
    next();
});

app.use('/facebook', facebookController);
app.use('/google', googleController);
app.use('/tawktoController', tawktoController);

http('main', app);
