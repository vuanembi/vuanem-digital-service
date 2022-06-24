import { Handler, Request } from 'express';

import GoogleService, { Options } from './google.service';

const parseRequest = (req: Request): Options => ({
    campaignId: parseInt(<string>req.query.campaignId),
    adGroupId: parseInt(<string>req.query.adGroupId),
});

const GoogleController: Handler = async (req, res) => {
    const options = parseRequest(req);

    GoogleService(options).then((data) =>
        data
            ? res.json({ data })
            : res.status(404).json({ error: 'Not Found' }),
    );
};

export default GoogleController;
