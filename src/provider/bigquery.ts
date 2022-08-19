import knex from 'knex';
import { BigQuery } from '@google-cloud/bigquery';

export const get = async <T>(query: string): Promise<T[]> => {
    const client = new BigQuery();
    return client.query({ query }).then(([rows]) => rows);
};

export const QueryBuilder = knex({ client: 'mysql' });
