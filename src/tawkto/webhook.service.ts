import { v4 as uuidv4 } from 'uuid';

import { WebhookOptions } from '../webhook/webhook.service';
import { WebhookDto } from './webhook.dto';

export const webhook: WebhookOptions<WebhookDto> = {
    parseFn: (data) => [
        {
            id: uuidv4(),
            event: data.event,
            chatId: data.chatId,
            time: data.time,
            message: data.message
                ? {
                      text: data.message.text,
                      type: data.message.type,
                      sender: { type: data.message.sender.type },
                  }
                : {},
            visitor: {
                name: data.visitor.name,
                email: data.visitor.email,
                city: data.visitor.city,
                country: data.visitor.country,
            },
            property: {
                id: data.property.id,
                name: data.property.name,
            },
        },
    ],
    options: {
        dataset: 'IP_TawkTo',
        table: 'WebhookChat',
        schema: [
            { name: 'id', type: 'STRING' },
            { name: 'event', type: 'STRING' },
            { name: 'chatId', type: 'STRING' },
            { name: 'time', type: 'TIMESTAMP' },
            {
                name: 'message',
                type: 'RECORD',
                fields: [
                    { name: 'text', type: 'STRING' },
                    { name: 'type', type: 'STRING' },
                    {
                        name: 'sender',
                        type: 'RECORD',
                        fields: [{ name: 'type', type: 'STRING' }],
                    },
                ],
            },
            {
                name: 'visitor',
                type: 'RECORD',
                fields: [
                    { name: 'name', type: 'STRING' },
                    { name: 'email', type: 'STRING' },
                    { name: 'city', type: 'STRING' },
                    { name: 'country', type: 'STRING' },
                ],
            },
            {
                name: 'property',
                type: 'RECORD',
                fields: [
                    { name: 'id', type: 'STRING' },
                    { name: 'name', type: 'STRING' },
                ],
            },
        ],
    },
};
