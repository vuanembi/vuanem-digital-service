import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();

export const getSecret = async (secretKey: string) => {
    const projectId = await client.getProjectId();

    const name = `projects/${projectId}/secrets/${secretKey}/versions/latest`;

    const [version] = await client.accessSecretVersion({ name });

    return version.payload?.data?.toString() || '';
};
