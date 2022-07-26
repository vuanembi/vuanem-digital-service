import { chunk, sum } from 'lodash';

import { get, QueryBuilder } from '../../../provider/bigquery';
import { upload, ConversionData } from './facebook.repository';

const EVENT_SET_ID = 1677017575826990;
const CHUNK = 2000;

export type Data = {
    event_time: number;
    phone: string;
    order_id: string;
    value: number;
};

const transform = (rows: Data[]): ConversionData[] => {
    const transformed: ConversionData['data'] = rows.map(
        ({ event_time, phone, order_id, value }) => ({
            match_keys: { phone: [phone] },
            value,
            event_time,
            order_id,
            currency: 'VND',
            event_name: 'Purchase',
            custom_data: { event_source: 'in_store' },
        }),
    );

    return chunk(transformed, CHUNK).map((data) => ({
        upload_tag: 'store_data',
        data,
    }));
};

export const buildQuery = (date: string) =>
    QueryBuilder.withSchema('OP_Marketing')
        .from('MK_OfflineConversion')
        .select()
        .whereRaw(`date(timestamp_seconds(event_time)) = ?`, date);

const FacebookService = async (date: string) => {
    const query = buildQuery(date);

    return get<Data>(query.toQuery())
        .then(transform)
        .then((chunks) =>
            Promise.all(chunks.map((chunk) => upload(chunk, EVENT_SET_ID))),
        )
        .then((numProcesseds) => sum(numProcesseds));
};

export default FacebookService;
