import GoogleService, { buildQuery } from './google.service';

const cases = [
    {
        name: 'Success',
        options: {
            campaignId: 17381316647,
            adGroupId: 140248849427,
        },
    },
    {
        name: 'Failure',
        options: {
            campaignId: 17381316647,
            adGroupId: 140248849421,
        },
    },
];

describe('Build', () => {
    it.each(cases)('$name', ({ options }) => {
        const query = buildQuery(options);
        console.log(query.toQuery());
        expect(query).toBeTruthy();
    });
});

describe('Query', () => {
    it.each(cases)('$name', async ({ name, options }) => {
        return GoogleService(options).then((data) => {
            console.log({ name, data });

            name === 'Success'
                ? expect(data?.criterias.length).toBeGreaterThan(0)
                : expect(data).toBeUndefined();
        });
    });
});
