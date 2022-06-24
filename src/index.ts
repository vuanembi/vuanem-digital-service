import { http } from '@google-cloud/functions-framework';
import express from 'express';

import ConversionController from './feature/conversion/conversion.controller';
import GoogleController from './feature/google/google.controller';

const app = express();

app.use('/conversion', ConversionController);
app.get('/google/keyword', GoogleController);

http('main', app);
