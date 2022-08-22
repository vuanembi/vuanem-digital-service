import { http } from '@google-cloud/functions-framework';
import express from 'express';

import { conversionController } from './feature/conversion/conversion.controller';
import { googleController } from './feature/google/google.controller';

const app = express();

app.use('/conversion', conversionController);
app.get('/google/keyword', googleController);

http('main', app);
