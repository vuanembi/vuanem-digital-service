import { uploadConversions } from './facebook.service';

it('upload-conversions', async () => {
    const date = '2022-09-24';

    return uploadConversions(date).then((res) => {
        console.log(res);
        expect(res).toBeGreaterThan(0);
    });
});
