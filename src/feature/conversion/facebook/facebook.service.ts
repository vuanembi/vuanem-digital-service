import { get } from '../../../provider/bigquery';
import { upload, ConversionData } from './facebook.repository';
import { getDate } from '../utils';

const EVENT_SET_ID = 1677017575826990;

export type Data = {
    event_time: number;
    phone: string;
    order_id: string;
    value: number;
};

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

const FacebookService = async (day: number) =>
    get<Data>({ query, params: { event_time: getDate(day) } })
        .then(transform)
        .then(upload(EVENT_SET_ID));

export default FacebookService;
