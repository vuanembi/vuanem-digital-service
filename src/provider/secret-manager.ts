import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

export const getFacebookToken = async () => {
    const client = new SecretManagerServiceClient();

    const projectId = await client.getProjectId();

    const name = `projects/${projectId}/secrets/facebook-conversions/versions/latest`;

    const [version] = await client.accessSecretVersion({ name });

    return version.payload?.data?.toString() || '';
};
