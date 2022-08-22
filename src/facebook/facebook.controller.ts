import express, { Request, Response } from 'express';

import { conversion } from './facebook.service';

import { getDate } from '../conversion/conversion.service';

export const facebookController = express.Router();

facebookController.post('/conversion', (req: Request, res: Response) => {
    const date = getDate(req.params.date);

    conversion(date).then((num) => {
        console.log({ num });
        res.status(200).send({ num });
    });
});
