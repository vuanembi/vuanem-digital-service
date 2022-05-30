import { BigQueryTimestamp } from '@google-cloud/bigquery';

export type Data = {
    dt: BigQueryTimestamp;
    gclid: string;
    value: number;
};

export type ConversionData = {
    'Google Click ID': string;
    'Conversion Name': string;
    'Conversion Time': string;
    'Conversion Currency': 'VND';
    'Conversion Value': number;
};
