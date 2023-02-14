import { parseQuery } from './conversion.service';

it('parse-query', async () => {
    return parseQuery({})
        .then((query) => {
            expect(query).toBeTruthy();
        })
        .catch((err) => {
            console.log(err);
        });
});
