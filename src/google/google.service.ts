import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { parse } from 'json2csv';

import { get, qb } from '../bigquery.service';
import { Field, ConversionData } from './google.conversion.interface';
import { LookupOptions, LookupData } from './google.lookup.interface';

dayjs.extend(utc);

export const conversion = async (date: string): Promise<[string, string]> => {
    const fields: Field[] = [
        ['Google Click ID', ({ gclid }) => gclid],
        [
            'Conversion Time',
            ({ dt }) => dayjs.utc(dt.value).format('YYYY-MM-DDTHH:mm:ssZZ'),
        ],
        ['Conversion Value', ({ value }) => value],
        ['Conversion Currency', () => 'VND'],
        ['Conversion Name', () => 'Offline Conversion'],
    ];

    const query = qb
        .withSchema('OP_Marketing')
        .from('MK_OfflineConversion_Google')
        .select()
        .whereRaw(`extract(date from dt) = ?`, date);

    return get<ConversionData>(query.toQuery())
        .then((rows) =>
            rows.map((row) => {
                const values = fields.map(([key, valueFn]) => [
                    key,
                    valueFn(row),
                ]);

                return Object.fromEntries(values);
            }),
        )
        .then((data) => [
            `${date}.csv`,
            parse(data, { fields: fields.map(([field]) => field) }),
        ]);
};

export const lookup = async ({ campaignId, adGroupId }: LookupOptions) => {
    const query = qb
        .withSchema('IP_GoogleAds')
        .from('Keyword_7248313550')
        .select({
            campaignId: 'CampaignId',
            adGroupId: 'AdGroupId',
            criterias: qb.raw(`array_agg(Criteria)`),
        })
        .whereRaw('_DATA_DATE = _LATEST_DATE')
        .groupBy(['CampaignId', 'AdGroupId'])
        .where('CampaignId', campaignId)
        .where('AdGroupId', adGroupId);

    return get<LookupData>(query.toQuery()).then((data) => data.pop());
};
