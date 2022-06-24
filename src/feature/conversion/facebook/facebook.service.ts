import { get, QueryBuilder } from '../../../provider/bigquery';
import { upload, ConversionData } from './facebook.repository';

const EVENT_SET_ID = 1677017575826990;

export type Data = {
    event_time: number;
    phone: string;
    order_id: string;
    value: number;
};

const transform = (rows: Data[]): ConversionData => ({
    upload_tag: 'store_data',
    data: rows.map(({ event_time, phone, order_id, value }) => ({
        match_keys: { phone: [phone] },
        value,
        event_time,
        order_id,
        currency: 'VND',
        event_name: 'Purchase',
        custom_data: { event_source: 'in_store' },
    })),
});

export const buildQuery = (date: string) =>
    QueryBuilder.withSchema('OP_Marketing')
        .from('MK_OfflineConversion')
        .select()
        .whereRaw(`date(timestamp_seconds(event_time)) = ?`, date);

const FacebookService = async (date: string) => {
    const query = buildQuery(date);

    return get<Data>(query.toQuery())
        .then(transform)
        .then(upload(EVENT_SET_ID));
};
export default FacebookService;
