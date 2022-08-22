import { http } from '@google-cloud/functions-framework';
import express from 'express';

import { facebookController } from './facebook/facebook.controller';
import { googleController } from './google/google.controller';

const app = express();

app.use('/facebook', facebookController);
app.use('/google', googleController);

http('main', app);
