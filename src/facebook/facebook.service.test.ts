import { conversion, conversionAcquisition } from './facebook.service';

it('Conversion', async () => {
    const date = '2022-09-24';

    return conversion(date).then((res) => {
        console.log(res);
        expect(res).toBeGreaterThan(0);
    });
});

it('Conversion Acquisition', async () => {
    const date = '2022-10-19';

    return conversionAcquisition(date).then((res) => {
        console.log(res);
        expect(res).toBeGreaterThan(0);
    });
});
