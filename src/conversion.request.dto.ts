import Joi from 'joi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

type ConversionRequest = {
    date: string;
};

export const ConversionServiceQuery = Joi.object<ConversionRequest>({
    date: Joi.string()
        .default(dayjs.utc().subtract(1, 'day').format('YYYY-MM-DD'))
        .regex(/\d{4}-\d{2}-\d{2}/),
});
