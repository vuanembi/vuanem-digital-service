import { get, QueryBuilder } from '../../provider/bigquery';

export type Options = {
    campaignId?: number;
    adGroupId?: number;
};

export const buildQuery = ({ campaignId, adGroupId }: Options) => {
    const query = QueryBuilder.withSchema('IP_GoogleAds')
        .from('Keyword_7248313550')
        .select({
            campaignId: 'CampaignId',
            adGroupId: 'AdGroupId',
            criterias: QueryBuilder.raw(`array_agg(Criteria)`),
        })
        .whereRaw('_DATA_DATE = _LATEST_DATE')
        .groupBy(['CampaignId', 'AdGroupId'])
        .andWhere('CampaignId', campaignId);

    campaignId && query.andWhere('CampaignId', campaignId);
    adGroupId && query.andWhere('AdGroupId', adGroupId);

    return query;
};

type Data = Options & {
    criterias: string[];
};

export const googleService = async (options: Options) => {
    const query = buildQuery(options);

    return get<Data>(query.toQuery()).then((data) => data.pop());
};
