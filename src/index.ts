import { http } from '@google-cloud/functions-framework';
import express from 'express';

import ConversionController from './feature/conversion/conversion.controller';

const app = express();

app.get('/conversion', ConversionController);

http('main', app);
