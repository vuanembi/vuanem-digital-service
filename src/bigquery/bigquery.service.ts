import knex from 'knex';
import { BigQuery } from '@google-cloud/bigquery';

const client = new BigQuery();

export const qb = knex({ client: 'mysql' });

export const get = async <T>(query: string): Promise<T[]> => {
    return client.query({ query }).then(([rows]) => rows);
};

export type InsertOptions = {
    dataset: string;
    table: string;
    schema: Record<string, any>[];
};

export const insert = async <T>(data: T, options: InsertOptions) => {
    const { dataset, table, schema } = options;

    return client
        .dataset(dataset)
        .table(table)
        .insert(data, { schema })
        .then(() => data);
};
