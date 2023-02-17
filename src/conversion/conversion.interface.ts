export type ConversionRequest = {
    date: string;
};

export type ConversionData = {
    event_time: number;
    phone: string;
    order_id: string;
    value: number;
};
