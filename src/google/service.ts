import dayjs from 'dayjs';
import { parse } from 'json2csv';

import { Data, ConversionData } from './interface';
import { get } from '../db/bigquery';
import { getDate } from '../utils';

const query = `
    SELECT * FROM OP_Marketing.MK_OfflineConversion_Google
    WHERE EXTRACT(DATE FROM dt) = @dt
    `;

const fields: (keyof ConversionData)[] = [
    'Google Click ID',
    'Conversion Time',
    'Conversion Value',
    'Conversion Currency',
    'Conversion Name',
];

const transform = (data: Data[]): ConversionData[] =>
    data.map(({ dt, gclid, value }) => ({
        'Google Click ID': gclid,
        'Conversion Time': dayjs(dt.value)
            .utc()
            .format('YYYY-MM-DDTHH:mm:ssZZ'),
        'Conversion Value': value,
        'Conversion Currency': 'VND',
        'Conversion Name': 'Offline Conversion',
    }));

const service = async (day = 1): Promise<[string, string]> => {
    const dt = getDate(day);

    return get<Data>({ query, params: { dt: getDate(day) } })
        .then(transform)
        .then((data) => [`${dt}.csv`, parse(data, { fields })]);
};

export default service;
