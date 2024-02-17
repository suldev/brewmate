import { getYeastAsync, getYeastNamesAsync } from '../ts/yeast'

describe('testing getYeastNamesAsync', () => {
    test('length should result in 232', () => {
        getYeastNamesAsync().then((names) => {
            expect(names?.length).toBe(232);
        })
        .catch(() => fail('yeast count failed'));
    });
});

describe('testing getYeastAsync', () => {
    test('name should be WLP026 Premium Bitter Ale', () => {
        getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.name).toBe("WLP026 Premium Bitter Ale");
        })
        .catch(() => fail('yeast name failed'));
    });
    test('type should be Ale', () => {
        getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.type).toBe("Ale");
        })
        .catch(() => fail('yeast type failed'));
    });
    test('templo should be 67', () => {
        getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.templo).toBe("67");
        })
        .catch(() => fail('yeast templo failed'));
    });
    test('temphi should be 70', () => {
        getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.temphi).toBe("70");
        })
        .catch(() => fail('yeast temphi failed'));
    });
    test('attenuation should be 72.5', () => {
        getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.attenuation).toBe("72.5");
        })
        .catch(() => fail('yeast attenuation failed'));
    });
    test('flocculation should be Medium', () => {
        getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.flocculation).toBe("Medium");
        })
        .catch(() => fail('yeast flocculation failed'));
    });
});