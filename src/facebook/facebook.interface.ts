export type ConversionData = {
    event_time: number;
    phone: string;
    order_id: string;
    value: number;
};

export type UploadResponse = {
    num_processed_entries: number;
};

export type UploadData = {
    upload_tag: string;
    data: {
        match_keys: {
            phone: string[];
        };
        currency: string;
        value: number;
        event_name: string;
        event_time: number;
        order_id: string;
        custom_data: {
            event_source: string;
        };
    }[];
};
