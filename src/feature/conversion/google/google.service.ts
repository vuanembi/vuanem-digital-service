import dayjs from 'dayjs';
import { parse } from 'json2csv';
import { BigQueryTimestamp } from '@google-cloud/bigquery';

import { get, QueryBuilder } from '../../../provider/bigquery';

type Data = {
    dt: BigQueryTimestamp;
    gclid: string;
    value: number;
};

type ConversionData = {
    'Google Click ID': string;
    'Conversion Name': string;
    'Conversion Time': string;
    'Conversion Currency': 'VND';
    'Conversion Value': number;
};

type Field = [
    keyof ConversionData,
    (row: Data) => ConversionData[keyof ConversionData],
];

export const buildQuery = (date: string) =>
    QueryBuilder.withSchema('OP_Marketing')
        .from('MK_OfflineConversion_Google')
        .select()
        .whereRaw(`extract(date from dt) = ?`, date);

const fields: Field[] = [
    ['Google Click ID', ({ gclid }) => gclid],
    [
        'Conversion Time',
        ({ value }) => dayjs(value).utc().format('YYYY-MM-DDTHH:mm:ssZZ'),
    ],
    ['Conversion Value', ({ value }) => value],
    ['Conversion Currency', () => 'VND'],
    ['Conversion Name', () => 'Offline Conversion'],
];

const transform = (rows: Data[]): ConversionData[] =>
    rows.map((row) => {
        const values = fields.map(([key, valueFn]) => [key, valueFn(row)]);

        return Object.fromEntries(values);
    });

const GoogleService = async (date: string): Promise<[string, string]> => {
    const query = buildQuery(date);

    return get<Data>(query.toQuery())
        .then(transform)
        .then((data) => [
            `${date}.csv`,
            parse(data, { fields: fields.map(([field]) => field) }),
        ]);
};

export default GoogleService;
