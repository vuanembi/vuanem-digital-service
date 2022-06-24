import { Handler } from 'express';

import GoogleService from './google.service';

const GoogleController: Handler = (req, res) => {
    const { params } = req;

    GoogleService(params?.day ? parseInt(params.day) : 1)
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
