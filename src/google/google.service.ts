import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { parse } from 'json2csv';

import { get, qb } from '../bigquery/bigquery.service';
import { ConversionData } from '../conversion/conversion.interface';
import { getSalesOrderData } from '../conversion/conversion.service';
import { LookupOptions, LookupData } from './google.lookup.interface';

dayjs.extend(utc);

export const exportConversions = async (date: string): Promise<[string, string]> => {
    const fields: [string, (row: ConversionData) => any][] = [
        ['Email', () => null],
        ['Phone Number', (row) => row.phone],
        ['Conversion Name', () => 'Offline Conversion'],
        ['Conversion Time', (row) => dayjs.unix(row.event_time).format('YYYY-MM-DDTHH:mm:ssZZ')],
        ['Conversion Value', (row) => row.value],
        ['Conversion Currency', () => 'VND'],
    ];

    return getSalesOrderData(date)
        .then((rows) => {
            return rows.map((row) => {
                const values = fields.map(([key, valueFn]) => [key, valueFn(row)]);

                return Object.fromEntries(values);
            });
        })
        .then((data) => [`${date}.csv`, parse(data, { fields: fields.map(([field]) => field) })]);
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
