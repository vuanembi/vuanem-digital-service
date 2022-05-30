import facebookService from './service';

it('Facebook', () =>
    facebookService(1).then((res) => {
        console.log(res);
        expect(res).toBeGreaterThan(0);
    }));
