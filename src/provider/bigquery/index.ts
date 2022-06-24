import knex from 'knex';
import { BigQuery } from '@google-cloud/bigquery';

const client = new BigQuery();

export const get = <T>(query: string): Promise<T[]> =>
    client.query({ query }).then(([rows]) => rows);

export const QueryBuilder = knex({ client: 'mysql' });
