export type WebhookDto = {
    event: string;
    chatId: string;
    time: string;
    message?: {
        text: string;
        type: string;
        sender: {
            type: string;
        };
    };
    visitor: {
        name: string;
        email: string;
        city: string;
        country: string;
    };
    property: {
        id: string;
        name: string;
    };
};
