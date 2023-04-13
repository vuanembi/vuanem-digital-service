import { chunk, sum } from 'lodash';

import { get, qb } from '../bigquery/bigquery.service';
import { uploadEvents } from './facebook.repository';

type SalesOrderData = {
    event_time: number;
    phone: string;
    order_id: string;
    value: number;
};

export const uploadConversions = async (date: string) => {
    const query = qb
        .withSchema('OP_Marketing')
        .from('MK_OfflineConversion')
        .select()
        .whereRaw(`date(timestamp_seconds(event_time)) = ?`, date);

    return get<SalesOrderData>(query.toQuery())
        .then((rows) => {
            return rows.map(({ event_time, phone, order_id, value }) => {
                return {
                    match_keys: { phone: [phone] },
                    value,
                    event_time,
                    order_id,
                    currency: 'VND',
                    event_name: 'purchase',
                    custom_data: { event_source: 'in_store' },
                };
            });
        })
        .then((rows) => chunk(rows, 2000))
        .then((chunks) => chunks.map((data) => ({ upload_tag: 'store_data', data })))
        .then((chunks) => {
            const requests = [
                { eventSetId: 1677017575826990, secretKey: 'facebook-conversions' },
                { eventSetId: 864437838246208, secretKey: 'facebook-system-access-token' },
            ].flatMap((options) => chunks.map((chunk) => uploadEvents(chunk, options)));

            return Promise.all(requests);
        })
        .then((numProcesseds) => sum(numProcesseds));
};
