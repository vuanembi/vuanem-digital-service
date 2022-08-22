import express, { Request, Response } from 'express';

import { conversion, lookup } from './google.service';
import { getDate } from '../conversion/conversion.service';

export const googleController = express.Router();

googleController.post('/conversion', (req: Request, res: Response) => {
    const date = getDate(req.params.date);

    conversion(date)
        .then(([filename, content]) => {
            res.attachment(filename);
            res.status(200).send(content);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send();
        });
});

googleController.get('/lookup', (req: Request, res: Response) => {
    const { campaignId, adGroupId } = req.query;

    if (!campaignId || !adGroupId) {
        res.status(400).json({ error: 'Bad request' });
        return;
    }

    lookup({
        campaignId: parseInt(<string>campaignId),
        adGroupId: parseInt(<string>adGroupId),
    })
        .then((data) =>
            data ? res.status(200).json({ data }) : res.status(404).end(),
        )
        .catch(() => res.status(500).end());
});
