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

export const exportConversionsPhone = async (date: string): Promise<[string, string]> => {
    const query = qb
        .withSchema('OP_Marketing')
        .from('MK_OfflineConversion')
        .select()
        .whereRaw(`date(timestamp_seconds(event_time)) = ?`, date);

    const fields: [string, (row: SalesOrderPhoneData) => any][] = [
        ['Email', () => null],
        ['Phone Number', (row) => row.phone],
        ['Conversion Name', () => 'OCT 16/01/2023'],
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
