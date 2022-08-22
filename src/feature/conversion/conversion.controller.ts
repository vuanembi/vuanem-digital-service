import express from 'express';

import { getDate } from './conversion.service';
import { facebookController } from './facebook/facebook.controller';
import { googleController } from './google/google.controller';

export const conversionController = express.Router();

conversionController.use(getDate);
conversionController.post('/facebook', facebookController);
conversionController.get('/google', googleController);
