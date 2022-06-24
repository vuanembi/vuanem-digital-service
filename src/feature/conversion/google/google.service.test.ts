import GoogleService, { buildQuery } from './google.service';

const date = '2022-02-02';

it('Build', () => {
    const query = buildQuery(date);
    console.log(query.toQuery());
    expect(query).toBeTruthy();
});

it('Service', () =>
    GoogleService(date).then(([filename, content]) => {
        console.log(content);
        expect(filename).toBeTruthy();
        expect(content).toBeTruthy();
    }));
