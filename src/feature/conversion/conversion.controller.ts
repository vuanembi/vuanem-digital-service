import express from 'express';

import { getDate } from './conversion.service';
import FacebookController from './facebook/facebook.controller';
import GoogleController from './google/google.controller';

const ConversionController = express.Router();

ConversionController.use(getDate);
ConversionController.post('/facebook', FacebookController);
ConversionController.get('/google', GoogleController);

export default ConversionController;
