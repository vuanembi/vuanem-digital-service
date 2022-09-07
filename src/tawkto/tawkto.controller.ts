import express, { Request, Response } from 'express';

import { webhookService } from '../webhook/webhook.service';
import { prechatSubmit } from './track.service';
import { webhook } from './webhook.service';

export const tawktoController = express.Router();

tawktoController.post('/prechat-submit', (req: Request, res: Response) => {
    webhookService(req.body, prechatSubmit)
        .then(() => res.status(200).json({ result: 'ok' }))
        .catch((error) => res.status(500).json({ error }));
});

tawktoController.post('/webhook', (req: Request, res: Response) => {
    webhookService(req.body, webhook)
        .then(() => res.status(200).json({ result: 'ok' }))
        .catch((error) => res.status(500).json({ error }));
});
