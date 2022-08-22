import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const timeFormat = 'YYYY-MM-DD';

export const conversionService = <T>(
    service: (date: string) => T,
    date?: string,
) => {
    const parsedDate = date
        ? dayjs.utc(date, timeFormat, true)
        : dayjs.utc(date).subtract(1, 'day');

    const _date = parsedDate.format(timeFormat);

    return service(_date);
};
