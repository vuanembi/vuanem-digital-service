import { conversion, lookup } from './google.service';

it('Conversion', async () => {
    const date = '2022-08-25';

    return conversion(date).then(([filename, content]) => {
        console.log(content);
        expect(filename).toBeTruthy();
        expect(content).toBeTruthy();
    });
});

describe('Lookup', () => {
    it('Success', async () => {
        const options = {
            campaignId: 17381316647,
            adGroupId: 140248849427,
        };

        return lookup(options).then((res) =>
            expect(res?.criterias.length).toBeGreaterThan(0),
        );
    });

    it('Failure', async () => {
        const options = {
            campaignId: 17381316647,
            adGroupId: 140248849421,
        };

        return lookup(options).then((res) => expect(res).toBeUndefined());
    });
});
