import axios from 'axios';

const API_VER = 'v13.0';

const client = axios.create({
    baseURL: `https://graph.facebook.com/${API_VER}`,
    params: { access_token: process.env.ACCESS_TOKEN || '' },
});

type UploadResponse = {
    num_processed_entries: number;
};

export type ConversionData = {
    upload_tag: 'store_data';
    data: {
        match_keys: {
            phone: string[];
        };
        currency: 'VND';
        value: number;
        event_name: 'Purchase';
        event_time: number;
        order_id: string;
        custom_data: {
            event_source: 'in_store';
        };
    }[];
};

export const upload = (eventSetId: number) => (data: ConversionData) =>
    client
        .post<UploadResponse>(`/${eventSetId}/events`, data)
        .then(({ data: { num_processed_entries } }) => num_processed_entries)
        .catch((err) => {
            err.isAxiosError && console.log(err.response?.data);
            return 0;
        });
