import express from 'express';

import { ConversionServiceQuery } from '../conversion.request.dto';
import { exportConversionsGclid, exportConversionsPhone } from './google.service';

export const GoogleController = express.Router();

GoogleController.get('/conversion/gclid', ({ query }, res) => {
    ConversionServiceQuery.validateAsync(query)
        .then(({ date }) =>
            exportConversionsGclid(date)
                .then(([filename, content]) => {
                    res.attachment(filename);
                    res.status(200).send(content);
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                    res.status(500).json({ error });
                }),
        )
        .catch((error) => {
            console.warn(JSON.stringify(error));
            res.status(400).json({ error });
        });
});

GoogleController.get('/conversion/phone', ({ query }, res) => {
    ConversionServiceQuery.validateAsync(query)
        .then(({ date }) =>
            exportConversionsPhone(date)
                .then(([filename, content]) => {
                    res.attachment(filename);
                    res.status(200).send(content);
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                    res.status(500).json({ error });
                }),
        )
        .catch((error) => {
            console.warn(JSON.stringify(error));
            res.status(400).json({ error });
        });
});
