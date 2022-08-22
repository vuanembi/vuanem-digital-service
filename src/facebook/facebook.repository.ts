import axios from 'axios';

import { getFacebookToken } from '../secret-manager.service';
import { UploadResponse, UploadData } from './facebook.interface';

const API_VER = 'v14.0';

const getClient = () =>
    getFacebookToken().then((access_token) =>
        axios.create({
            baseURL: `https://graph.facebook.com/${API_VER}`,
            params: { access_token },
        }),
    );

export const upload = async (data: UploadData, eventSetId: number) => {
    const client = await getClient();

    return client
        .post<UploadResponse>(`/${eventSetId}/events`, data)
        .then(({ data: { num_processed_entries } }) => num_processed_entries)
        .catch((err) => {
            err.isAxiosError && console.log(err.response?.data);
            return 0;
        });
};
