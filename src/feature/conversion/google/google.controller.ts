import { Handler } from 'express';

import { googleService } from './google.service';

export const googleController: Handler = (req, res) => {
    googleService(req.date)
        .then(([filename, content]) => {
            res.attachment(filename);
            res.status(200).send(content);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send();
        });
};
