import Joi from 'joi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

import { get, qb } from '../bigquery/bigquery.service';
import { ConversionData, ConversionRequest } from './conversion.interface';

export const parseQuery = (query: any) => {
    const schema = Joi.object<ConversionRequest>({
        date: Joi.string()
            .default(dayjs.utc().subtract(1, 'day').format('YYYY-MM-DD'))
            .regex(/\d{4}-\d{2}-\d{2}/),
    });

    return schema.validateAsync(query);
};

export const getSalesOrderData = (date: string) => {
    const query = qb
        .withSchema('OP_Marketing')
        .from('MK_OfflineConversion')
        .select()
        .whereRaw(`date(timestamp_seconds(event_time)) = ?`, date);

    return get<ConversionData>(query.toQuery());
};
