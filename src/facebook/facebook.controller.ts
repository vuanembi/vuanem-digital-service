import express, { Request, Response } from 'express';

import { conversionService } from '../conversion/conversion.service';
import { conversion, conversionAcquisition } from './facebook.service';

export const facebookController = express.Router();

facebookController.get('/conversion', (req: Request, res: Response) => {
    Promise.all(
        [conversion, conversionAcquisition].map((service) =>
            conversionService(service, req.query.date as string),
        ),
    )
        .then((num) => {
            console.log({ num });
            res.status(200).json({ num });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err });
        });
});
