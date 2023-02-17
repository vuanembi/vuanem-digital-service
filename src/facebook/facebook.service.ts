import { chunk, sum } from 'lodash';

import { getSalesOrderData } from '../conversion/conversion.service';
import { uploadEvents } from './facebook.repository';

export const uploadConversions = async (date: string) => {
    return getSalesOrderData(date)
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
