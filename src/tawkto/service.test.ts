import { webhookService } from '../webhook/webhook.service';
import { prechatSubmit } from './track.service';
import { webhook } from './webhook.service';

it('Prechat Submit', async () => {
    const data = {
        phone: '0773314401',
        name: 'Test',
        utm_source: 'bi',
        utm_medium: 'bi',
        utm_id: '12345',
        utm_campaign: 'Campaign',
        utm_content: 'Content',
    };

    return webhookService(data, prechatSubmit).then((res) =>
        expect(res).toBeTruthy(),
    );
});

describe('Webhook', () => {
    it('Chat Start', async () => {
        const data = {
            event: 'chat:start',
            chatId: '70fe3290-99ad-11e9-a30a-51567162179f',
            time: '2019-06-28T14:03:04.646Z',
            message: {
                text: 'Sample message',
                type: 'msg',
                sender: {
                    type: 'visitor',
                },
            },
            visitor: {
                name: 'V1561719148780935',
                email: 'hello@test.com',
                city: 'jelgava',
                country: 'LV',
            },
            property: {
                id: '58ca8453b8a7e060cd3b1ecb',
                name: 'Bobs Burgers',
            },
        };

        return webhookService(data, webhook).then((res) =>
            expect(res).toBeTruthy(),
        );
    });

    it('Chat End', async () => {
        const data = {
            event: 'chat:end',
            chatId: '70fe3290-99ad-11e9-a30a-51567162179f',
            time: '2019-06-28T14:04:08.718Z',
            visitor: {
                name: 'V1561719148780935',
                email: 'hello@test.com',
                city: 'jelgava',
                country: 'LV',
            },
            property: {
                id: '58ca8453b8a7e060cd3b1ecb',
                name: 'Bobs Burgers',
            },
        };

        return webhookService(data, webhook).then((res) =>
            expect(res).toBeTruthy(),
        );
    });
});
