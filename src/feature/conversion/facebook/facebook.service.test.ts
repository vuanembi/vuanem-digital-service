import { facebookService, buildQuery } from './facebook.service';

const date = '2022-08-21';

it('Build', () => {
    const query = buildQuery(date);
    console.log(query.toQuery());
    expect(query).toBeTruthy();
});

it('Service', () =>
    facebookService(date).then((res) => {
        console.log(res);
        expect(res).toBeGreaterThan(0);
    }));
