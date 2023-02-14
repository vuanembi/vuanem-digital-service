import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

import { InsertOptions, insert } from '../bigquery/bigquery.service';

export type WebhookOptions<T, R = any> = {
    parseFn: (data: T) => R;
    options: InsertOptions;
};

export const webhookService = <T>(data: T, { parseFn, options }: WebhookOptions<T>) => {
    return insert(parseFn(data), options);
};
