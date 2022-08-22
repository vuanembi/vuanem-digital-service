import { BigQueryTimestamp } from '@google-cloud/bigquery';

export type ConversionData = {
    dt: BigQueryTimestamp;
    gclid: string;
    value: number;
};

export type ConversionResponse = {
    'Google Click ID': string;
    'Conversion Name': string;
    'Conversion Time': string;
    'Conversion Currency': 'VND';
    'Conversion Value': number;
};

export type Field = [
    keyof ConversionResponse,
    (row: ConversionData) => ConversionResponse[keyof ConversionResponse],
];
