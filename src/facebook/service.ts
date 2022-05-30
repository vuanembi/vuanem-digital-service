import { Data, ConversionData } from './interface';
import { get } from '../db/bigquery';
import { upload } from './repo';
import { getDate } from '../utils';

const EVENT_SET_ID = 1677017575826990;

const query = `
    SELECT * FROM OP_Marketing.MK_OfflineConversion
    WHERE DATE(TIMESTAMP_SECONDS(event_time)) = @event_time
    `;

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

const service = async (day = 1) =>
    get<Data>({ query, params: { event_time: getDate(day) } })
        .then(transform)
        .then(upload(EVENT_SET_ID));

export default service;
