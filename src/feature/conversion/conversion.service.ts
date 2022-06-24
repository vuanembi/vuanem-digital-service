import { Handler } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const timeFormat = 'YYYY-MM-DD';

export const getDate: Handler = (req, res, next) => {
    const { date }: { date: string | undefined } = req.body || req.params;

    const _date = date
        ? dayjs.utc(date, timeFormat, true)
        : dayjs.utc(date).subtract(1, 'day');

    req.date = _date.format(timeFormat);

    next();
};
