import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();

export const getFacebookToken = async () => {
    const projectId = await client.getProjectId();

    const name = `projects/${projectId}/secrets/facebook-conversions/versions/latest`;

    const [version] = await client.accessSecretVersion({ name });

    return version.payload?.data?.toString() || '';
};
