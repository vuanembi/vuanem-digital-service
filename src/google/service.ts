import dayjs from 'dayjs';
import { parse } from 'json2csv';

import { Data, ConversionData, Field } from './interface';
import { get } from '../db/bigquery';
import { getDate } from '../utils';

const query = `
    SELECT * FROM OP_Marketing.MK_OfflineConversion_Google
    WHERE EXTRACT(DATE FROM dt) = @dt
    `;

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

const service = async (day: number): Promise<[string, string]> => {
    const dt = getDate(day);

    return get<Data>({ query, params: { dt: getDate(day) } })
        .then(transform)
        .then((data) => [
            `${dt}.csv`,
            parse(data, { fields: fields.map(([field]) => field) }),
        ]);
};

export default service;
