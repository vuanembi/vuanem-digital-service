import { Handler } from 'express';

import { facebookService } from './facebook.service';

export const facebookController: Handler = (req, res) => {
    facebookService(req.date).then((num) => {
        console.log({ num });
        res.status(200).send({ num });
    });
};
