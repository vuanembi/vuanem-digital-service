export type LookupOptions = {
    campaignId: number;
    adGroupId: number;
};

export type LookupData = LookupOptions & {
    criterias: string[];
};
