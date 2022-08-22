import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const timeFormat = 'YYYY-MM-DD';

export const getDate = (date?: string) => {
    const _date = date
        ? dayjs.utc(date, timeFormat, true)
        : dayjs.utc(date).subtract(1, 'day');

    return _date.format(timeFormat);
};
