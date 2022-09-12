import { chunk, sum } from 'lodash';

import { get, qb } from '../bigquery.service';
import { ConversionData } from './facebook.interface';
import { upload } from './facebook.repository';

const EVENT_SET_IDS: [number, string][] = [
    [1677017575826990, 'facebook-conversions'],
    [864437838246208, 'facebook-system-access-token'],
];
const CHUNK = 2000;

export const conversion = async (date: string) => {
    const query = qb
        .withSchema('OP_Marketing')
        .from('MK_OfflineConversion')
        .select()
        .whereRaw(`date(timestamp_seconds(event_time)) = ?`, date);

    const parse = ({ event_time, phone, order_id, value }: ConversionData) => ({
        match_keys: { phone: [phone] },
        value,
        event_time,
        order_id,
        currency: 'VND',
        event_name: 'Purchase',
        custom_data: { event_source: 'in_store' },
    });

    return get<ConversionData>(query.toQuery())
        .then((rows) => rows.map((row) => parse(row)))
        .then((rows) => chunk(rows, CHUNK))
        .then((chunks) =>
            chunks.map((data) => ({ upload_tag: 'store_data', data })),
        )
        .then((chunks) => {
            const requests = EVENT_SET_IDS.flatMap((setId) =>
                chunks.map((chunk) => upload(chunk, setId)),
            );
            return Promise.all(requests);
        })
        .then((numProcesseds) => sum(numProcesseds));
};
