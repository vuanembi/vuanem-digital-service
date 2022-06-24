import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const getDate = (day = 1): string =>
    dayjs.utc().subtract(day, 'day').format('YYYY-MM-DD');
