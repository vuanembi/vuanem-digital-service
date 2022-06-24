import { Handler } from 'express';

import GoogleService from './google.service';

const GoogleController: Handler = (req, res) => {
    GoogleService(req.date)
        .then(([filename, content]) => {
            res.attachment(filename);
            res.status(200).send(content);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send();
        });
};

export default GoogleController;
