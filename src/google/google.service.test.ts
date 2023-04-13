import fs from 'node:fs';

import { exportConversions, lookup } from './google.service';

it('conversion', async () => {
    const date = '2023-02-13';

    return exportConversions(date).then(([filename, content]) => {
        expect(filename).toBe(`${date}.csv`);
        fs.writeFileSync(filename, content);
    });
});

describe('lookup', () => {
    it('lookup/success', async () => {
        const options = {
            campaignId: 17381316647,
            adGroupId: 140248849427,
        };

        return lookup(options).then((res) => expect(res?.criterias.length).toBeGreaterThan(0));
    });

    it('lookup/failure', async () => {
        const options = {
            campaignId: 17381316647,
            adGroupId: 140248849421,
        };

        return lookup(options).then((res) => expect(res).toBeUndefined());
    });
});
