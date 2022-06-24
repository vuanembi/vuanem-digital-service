import { Handler, Request } from 'express';

import GoogleService, { Options } from './google.service';

const parseRequest = (req: Request): Options => {
    const { campaignId, adGroupId } = req.query;

    if (!campaignId || !adGroupId) {
        throw new Error();
    }

    return {
        campaignId: parseInt(<string>campaignId),
        adGroupId: parseInt(<string>adGroupId),
    };
};

const GoogleController: Handler = async (req, res) => {
    try {
        const options = parseRequest(req);

        GoogleService(options).then((data) =>
            data
                ? res.json({ data })
                : res.status(404).json({ error: 'Not found' }),
        );
    } catch {
        res.status(400).json({ error: 'Bad request' });
    }
};

export default GoogleController;
