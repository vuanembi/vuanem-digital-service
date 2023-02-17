import express from 'express';

import { parseQuery } from '../conversion/conversion.service';
import { uploadConversions } from './facebook.service';

export const facebookController = express.Router();

facebookController.get('/conversion', ({ query }, res) => {
    parseQuery(query)
        .then(({ date }) =>
            uploadConversions(date)
                .then((result) => {
                    console.log(JSON.stringify({ result }));
                    res.status(200).json({ result });
                })
                .catch((err) => {
                    console.log(JSON.stringify(err));
                    res.status(500).json({ err });
                }),
        )
        .catch((err) => {
            console.log(JSON.stringify(err));
            res.status(400).json({ err });
        });
});
