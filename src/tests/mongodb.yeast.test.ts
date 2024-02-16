import { getYeastAsync, getYeastNamesAsync } from '../ts/yeast'

describe('testing getYeastNamesAsync', () => {
    test('length should result in 232', () => {
        getYeastNamesAsync().then((names) => {
            expect(names?.length).toBe(232);
        });
    });
});

describe('testing getYeastAsync', () => {
    test('name should be WLP026 Premium Bitter Ale', () => {
        getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.name).toBe("WLP026 Premium Bitter Ale");
        });
    });
    test('type should be Ale', () => {
        getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.yType).toBe("Ale");
        });
    });
    test('templo should be 67°F', () => {
        getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.templo).toBe("67°F");
        });
    });
    test('temphi should be 70°F', () => {
        getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.temphi).toBe("70°F");
        });
    });
    test('attenuation should be 72.5%', () => {
        getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.attenuation).toBe("72.5%");
        });
    });
    test('flocculation should be Medium', () => {
        getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.flocculation).toBe("Medium");
        });
    });
});