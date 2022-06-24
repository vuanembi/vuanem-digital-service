import FacebookService, { buildQuery } from './facebook.service';

const date = '2022-02-02';

it('Build', () => {
    const query = buildQuery(date);
    console.log(query.toQuery());
    expect(query).toBeTruthy();
});

it('Service', () =>
    FacebookService(date).then((res) => {
        console.log(res);
        expect(res).toBeGreaterThan(0);
    }));
