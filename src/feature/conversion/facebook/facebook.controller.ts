import { Handler } from 'express';

import FacebookService from './facebook.service';

const FacebookController: Handler = (req, res) => {
    FacebookService(req.date).then((num) => {
        console.log({ num });
        res.status(200).send({ num });
    });
};

export default FacebookController;
