import { BigQuery, Query } from '@google-cloud/bigquery';

const client = new BigQuery();

export const get = <T>(options: Query): Promise<T[]> =>
    client.query(options).then(([rows]) => rows);
