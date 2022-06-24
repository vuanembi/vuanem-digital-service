import facebookService from './facebook.service';

it('Facebook', () =>
    facebookService(1).then((res) => {
        console.log(res);
        expect(res).toBeGreaterThan(0);
    }));
