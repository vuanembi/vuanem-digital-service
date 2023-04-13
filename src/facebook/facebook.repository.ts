import axios from 'axios';

import { getSecret } from '../sercret-manager/secret-manager.service';
import { UploadResponse, UploadData } from './facebook.interface';

const API_VER = 'v16.0';

const getClient = async (secretKey: string) => {
    const accessToken = await getSecret(secretKey);

    return axios.create({
        baseURL: `https://graph.facebook.com/${API_VER}`,
        params: { access_token: accessToken },
    });
};

type UploadEventsOptions = {
    eventSetId: number;
    secretKey: string;
};

export const uploadEvents = async (data: UploadData, options: UploadEventsOptions) => {
    const client = await getClient(options.secretKey);

    return client
        .post<UploadResponse>(`/${options.eventSetId}/events`, data)
        .then(({ data: { num_processed_entries } }) => num_processed_entries)
        .catch((error) => {
            if (axios.isAxiosError(error)) {
                console.error(JSON.stringify(error.response?.data));
            }
            return Promise.reject(error);
        });
};
