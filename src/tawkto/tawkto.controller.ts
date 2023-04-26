import express from 'express';

import { webhookService } from '../webhook/webhook.service';
import { prechatSubmit } from './track.service';
import { webhook } from './webhook.service';

export const tawktoController = express.Router();

tawktoController.post('/prechat-submit', (req, res) => {
    webhookService(req.body, prechatSubmit)
        .then((data) => res.status(200).json({ data }))
        .catch((error) => res.status(500).json({ error }));
});

tawktoController.post('/webhook', (req, res) => {
    webhookService(req.body, webhook)
        .then((data) => res.status(200).json({ data }))
        .catch((error) => res.status(500).json({ error }));
});
