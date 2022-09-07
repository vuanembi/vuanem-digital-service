import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

import { WebhookOptions } from '../webhook/webhook.service';
import { PrechatSubmitDto } from './track.dto';

export const prechatSubmit: WebhookOptions<PrechatSubmitDto> = {
    parseFn: ({ phone, name }) => [
        { phone, name, id: uuidv4(), created_at: dayjs.utc().toISOString() },
    ],
    options: {
        dataset: 'IP_TawkTo',
        table: 'PrechatSubmit',
        schema: [
            { name: 'id', type: 'STRING' },
            { name: 'phone', type: 'STRING' },
            { name: 'name', type: 'STRING' },
            { name: 'created_at', type: 'TIMESTAMP' },
        ],
    },
};
