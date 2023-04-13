import knex from 'knex';
import { BigQuery } from '@google-cloud/bigquery';

const client = new BigQuery();

export const qb = knex({ client: 'mysql' });

export const get = async <T>(query: string): Promise<T[]> => {
    return client.query({ query }).then(([rows]) => rows);
};
