import { getHopAsync, getHopNamesAsync } from '../ts/hops'

describe('testing getHopNamesAsync', () => {
    test('length should result in 318', () => {
        getHopNamesAsync().then((names) => {
            expect(names?.length).toBe(318);
        })
        .catch(() => fail('hop count failed'));
    });
});

describe('testing getHopAsync', () => {
    test('name should be Chinook', () => {
        getHopAsync("Chinook").then((hop) => {
            expect(hop?.name).toBe("Chinook");
        })
        .catch(() => fail('hop name failed'));
    });
    test('alphalo should be 11.5', () => {
        getHopAsync("Chinook").then((hop) => {
            expect(hop?.alphalo).toBe("11.5");
        })
        .catch(() => fail('hop alphalo failed'));
    });
    test('alphahi should be 15', () => {
        getHopAsync("Chinook").then((hop) => {
            expect(hop?.alphahi).toBe("15");
        })
        .catch(() => fail('hop alphahi failed'));
    });
    test('betalo should be 3.0', () => {
        getHopAsync("Chinook").then((hop) => {
            expect(hop?.betalo).toBe("3.0");
        })
        .catch(() => fail('hope beta failed'));
    });
    test('betahi should be 4.0', () => {
        getHopAsync("Chinook").then((hop) => {
            expect(hop?.betahi).toBe("4.0");
        })
        .catch(() => fail('hope beta failed'));
    });
});