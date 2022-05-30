import googleService from './service';

it('Google', () =>
    googleService(1).then(([filename, content]) => {
        console.log(content);
        expect(filename).toBeTruthy();
        expect(content).toBeTruthy();
    }));
