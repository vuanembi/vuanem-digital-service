import { Handler, Request } from 'express';

import FacebookService from './facebook.service';
import { getDate } from '../utils';

const parseRequest = (req: Request) => {
    const { day } = req.body;

    return day || 1;
};

const FacebookController: Handler = (req, res) => {
    FacebookService(parseRequest(req)).then((num) => {
        res.status(200).send({ num });
    });
};

export default FacebookController;
