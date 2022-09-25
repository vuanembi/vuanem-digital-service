import { conversion } from './facebook.service';

it('Conversion', async () => {
    const date = '2022-09-24';

    return conversion(date).then((res) => {
        console.log(res);
        expect(res).toBeGreaterThan(0);
    });
});
