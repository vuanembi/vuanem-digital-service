import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { parse } from 'json2csv';
import { BigQueryTimestamp } from '@google-cloud/bigquery';

import { get, qb } from '../bigquery/bigquery.service';

dayjs.extend(utc);

type SalesOrderGclidData = {
    dt: BigQueryTimestamp;
    gclid: string;
    value: number;
};

export const exportConversionsGclid = async (date: string): Promise<[string, string]> => {
    const query = qb
        .withSchema('OP_Marketing')
        .from('MK_OfflineConversion_Google')
        .select()
        .whereRaw(`extract(date from dt) = ?`, date);

    const fields: [string, (row: SalesOrderGclidData) => any][] = [
        ['Google Click ID', ({ gclid }) => gclid],
        ['Conversion Time', ({ dt }) => dayjs.utc(dt.value).format('YYYY-MM-DDTHH:mm:ssZZ')],
        ['Conversion Value', ({ value }) => value],
        ['Conversion Currency', () => 'VND'],
        ['Conversion Name', () => 'Offline Conversion'],
    ];

    return get<SalesOrderGclidData>(query.toQuery())
        .then((rows) => {
            return rows.map((row) => {
                const values = fields.map(([key, valueFn]) => [key, valueFn(row)]);

                return Object.fromEntries(values);
            });
        })
        .then((data) => [`${date}.csv`, parse(data, { fields: fields.map(([field]) => field) })]);
};

type SalesOrderPhoneData = {
    event_time: number;
    phone: string;
    order_id: string;
    value: number;
};

export const exportConversions = async (date: string): Promise<[string, string]> => {
    const query = qb
        .withSchema('OP_Marketing')
        .from('MK_OfflineConversion')
        .select()
        .whereRaw(`date(timestamp_seconds(event_time)) = ?`, date);

    const fields: [string, (row: SalesOrderPhoneData) => any][] = [
        ['Email', () => null],
        ['Phone Number', (row) => row.phone],
        ['Conversion Name', () => 'Offline Conversion'],
        ['Conversion Time', (row) => dayjs.unix(row.event_time).format('YYYY-MM-DDTHH:mm:ssZZ')],
        ['Conversion Value', (row) => row.value],
        ['Conversion Currency', () => 'VND'],
    ];

    return get<SalesOrderPhoneData>(query.toQuery())
        .then((rows) => {
            return rows.map((row) => {
                const values = fields.map(([key, valueFn]) => [key, valueFn(row)]);

                return Object.fromEntries(values);
            });
        })
        .then((data) => [`${date}.csv`, parse(data, { fields: fields.map(([field]) => field) })]);
};

export type LookupOptions = {
    campaignId: number;
    adGroupId: number;
};

export type LookupData = LookupOptions & {
    criterias: string[];
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
