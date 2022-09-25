import axios from 'axios';

import { getSecret } from '../secret-manager.service';
import { UploadResponse, UploadData } from './facebook.interface';

const API_VER = 'v14.0';

const getClient = (secretKey: string) =>
    getSecret(secretKey).then((access_token) =>
        axios.create({
            baseURL: `https://graph.facebook.com/${API_VER}`,
            params: { access_token },
        }),
    );

export const upload = async (
    data: UploadData,
    [eventSetId, secretKey]: [number, string],
) => {
    const client = await getClient(secretKey);

    return client
        .post<UploadResponse>(`/${eventSetId}/events`, data)
        .then(({ data: { num_processed_entries } }) => num_processed_entries)
        .catch((err) => {
            axios.isAxiosError(err) && console.log(err.response?.data);
            throw err;
        });
};
