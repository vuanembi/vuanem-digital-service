import { HttpFunction } from '@google-cloud/functions-framework';

import facebookService from './facebook/service';
import googleService from './google/service';

export const main: HttpFunction = (req, res) => {
    const { body, path, params } = req;

    console.log({ body, path });

    if (path === '/facebook') {
        facebookService(body.day).then((num) => {
            console.log(num);
            res.status(200).send({ num });
            return;
        });
    } else if (path === '/google') {
        googleService(params?.day ? parseInt(params.day) : undefined)
            .then(([filename, content]) => {
                res.attachment(filename);
                res.status(200).send(content);
                return;
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send();
                return;
            });
    } else {
        res.status(404).send();
        return;
    }
};
