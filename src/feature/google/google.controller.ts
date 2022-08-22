import { Handler } from 'express';

import { googleService } from './google.service';

export const googleController: Handler = async (req, res) => {
    const { campaignId, adGroupId } = req.query;

    if (!campaignId || !adGroupId) {
        res.status(400).json({ error: 'Bad request' });
        return;
    }

    googleService({
        campaignId: parseInt(<string>campaignId),
        adGroupId: parseInt(<string>adGroupId),
    })
        .then((data) =>
            data ? res.status(200).json({ data }) : res.status(404).end(),
        )
        .catch(() => res.status(500).end());
};
