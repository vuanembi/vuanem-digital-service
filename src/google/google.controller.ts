import express from 'express';

import { ConversionServiceQuery } from '../conversion.request.dto';
import { LookupQuery } from './google.request.dto';
import { exportConversionsGclid as exportConversionsPhone, lookup } from './google.service';

export const GoogleController = express.Router();

GoogleController.get('/conversion/gclid', ({ query }, res) => {
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

GoogleController.get('/keyword', (req, res) => {
    LookupQuery.validateAsync(req.query)
        .then(({ campaignId, adGroupId }) => {
            lookup({
                campaignId: parseInt(campaignId),
                adGroupId: parseInt(adGroupId),
            })
                .then((data) => (data ? res.status(200).json({ data }) : res.status(404).end()))
                .catch((error) => {
                    console.error(JSON.stringify({ error }));
                    res.status(500).json({ error });
                });
        })
        .catch((error) => {
            console.warn(JSON.stringify({ error }));
            res.status(400).json({ error });
        });
});
