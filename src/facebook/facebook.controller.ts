import express from 'express';

import { ConversionServiceQuery } from '../conversion.request.dto';
import { uploadConversions } from './facebook.service';

export const FacebookController = express.Router();

FacebookController.get('/conversion', ({ query }, res) => {
    ConversionServiceQuery.validateAsync(query)
        .then(({ date }) => {
            uploadConversions(date)
                .then((result) => {
                    console.log(JSON.stringify({ result }));
                    res.status(200).json({ result });
                })
                .catch((error) => {
                    console.error(JSON.stringify(error));
                    res.status(500).json({ error });
                });
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
            res.status(400).json({ error });
        });
});
