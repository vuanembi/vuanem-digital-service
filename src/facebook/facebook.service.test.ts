import { uploadConversions } from './facebook.service';

it('upload-conversions', async () => {
    const date = '2022-09-24';

    return uploadConversions(date).then((results) => {
        console.log(results);
        expect(results).toBeGreaterThan(0);
    });
});
