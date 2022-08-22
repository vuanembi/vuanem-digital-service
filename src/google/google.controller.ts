import express, { Request, Response } from 'express';

import { conversionService } from '../conversion/conversion.service';
import { conversion, lookup } from './google.service';

export const googleController = express.Router();

googleController.get('/conversion', (req: Request, res: Response) => {
    conversionService(conversion, req.params.date)
        .then(([filename, content]) => {
            res.attachment(filename);
            res.status(200).send(content);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err });
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
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err });
        });
});
