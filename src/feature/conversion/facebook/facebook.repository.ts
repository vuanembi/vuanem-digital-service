import axios from 'axios';

import { getFacebookToken } from '../../../provider/secret-manager';

const API_VER = 'v14.0';

const getClient = () =>
    getFacebookToken().then((access_token) =>
        axios.create({
            baseURL: `https://graph.facebook.com/${API_VER}`,
            params: { access_token },
        }),
    );

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

export const upload = async (data: ConversionData, eventSetId: number) => {
    const client = await getClient();

    return client
        .post<UploadResponse>(`/${eventSetId}/events`, data)
        .then(({ data: { num_processed_entries } }) => num_processed_entries)
        .catch((err) => {
            err.isAxiosError && console.log(err.response?.data);
            return 0;
        });
};
