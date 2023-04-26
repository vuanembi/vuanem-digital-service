import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

import { WebhookOptions } from '../webhook/webhook.service';
import { PrechatSubmitDto } from './track.dto';

export const prechatSubmit: WebhookOptions<PrechatSubmitDto> = {
    parseFn: (data) => [
        {
            id: uuidv4(),
            created_at: dayjs.utc().toISOString(),
            phone: data.phone,
            name: data.name,
            utm_source: data.utm_source,
            utm_medium: data.utm_medium,
            utm_id: data.utm_id,
            utm_campaign: data.utm_campaign,
            utm_content: data.utm_content,
        },
    ],
    options: {
        dataset: 'IP_TawkTo',
        table: 'PrechatSubmit',
        schema: [
            { name: 'id', type: 'STRING' },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'phone', type: 'STRING' },
            { name: 'name', type: 'STRING' },
            { name: 'utm_source', type: 'STRING' },
            { name: 'utm_medium', type: 'STRING' },
            { name: 'utm_id', type: 'STRING' },
            { name: 'utm_campaign', type: 'STRING' },
            { name: 'utm_content', type: 'STRING' },
        ],
    },
};
