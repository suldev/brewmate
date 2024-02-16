import { getHopAsync, getHopNamesAsync } from '../ts/hops'

describe('testing getHopNamesAsync', () => {
    test('length should result in 318', () => {
        getHopNamesAsync().then((names) => {
            expect(names?.length).toBe(318);
        });
    });
});

describe('testing getHopAsync', () => {
    test('name should be Chinook', () => {
        getHopAsync("Chinook").then((hop) => {
            expect(hop?.name).toBe("Chinook");
        });
    });
    test('alpha should be 11.5-15%', () => {
        getHopAsync("Chinook").then((hop) => {
            expect(hop?.alpha).toBe("11.5-15%");
        });
    });
    test('beta should be 3.0-4.0%', () => {
        getHopAsync("Chinook").then((hop) => {
            expect(hop?.beta).toBe("3.0-4.0%");
        });
    });
});