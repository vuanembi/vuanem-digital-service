import express, { Request, Response } from 'express';

import { conversionService } from '../conversion/conversion.service';
import { conversion } from './facebook.service';

export const facebookController = express.Router();

facebookController.post('/conversion', (req: Request, res: Response) => {
    conversionService(conversion, req.params.date)
        .then((num) => {
            console.log({ num });
            res.status(200).send({ num });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err });
        });
});
