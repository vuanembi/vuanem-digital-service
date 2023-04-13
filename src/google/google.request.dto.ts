import Joi from 'joi';

type LookupRequest = {
    campaignId: string;
    adGroupId: string;
};

export const LookupQuery = Joi.object<LookupRequest>({
    campaignId: Joi.string(),
    adGroupId: Joi.string(),
});
