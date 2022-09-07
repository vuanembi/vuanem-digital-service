import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

import { InsertOptions, insert } from '../bigquery.service';

export type WebhookOptions<T, R = any> = {
    parseFn: (data: T) => R;
    options: InsertOptions;
};

export const webhookService = <T>(
    data: T,
    { parseFn, options }: WebhookOptions<T>,
) => insert(parseFn(data), options);
