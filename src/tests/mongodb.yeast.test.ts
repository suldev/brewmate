import { BMMongo } from '../ts/mongodb'

describe('mongodb yeast fetch test ', () => {
    var hopTestPackage = new BMMongo('brewmate','password','192.168.1.10','brewmate');
    hopTestPackage.connect();
    test('length should result in 232', () => {
        hopTestPackage.getYeastNamesAsync().then((names) => {
            expect(names?.length).toBe(232);
        })
        .catch(() => fail('yeast count failed'));
    });
    test('name should be WLP026 Premium Bitter Ale', () => {
        hopTestPackage.getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.name).toBe("WLP026 Premium Bitter Ale");
        })
        .catch(() => fail('yeast name failed'));
    });
    test('type should be Ale', () => {
        hopTestPackage.getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.type).toBe("Ale");
        })
        .catch(() => fail('yeast type failed'));
    });
    test('templo should be 67', () => {
        hopTestPackage.getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.templo).toBe("67");
        })
        .catch(() => fail('yeast templo failed'));
    });
    test('temphi should be 70', () => {
        hopTestPackage.getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.temphi).toBe("70");
        })
        .catch(() => fail('yeast temphi failed'));
    });
    test('attenuation should be 72.5', () => {
        hopTestPackage.getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.attenuation).toBe("72.5");
        })
        .catch(() => fail('yeast attenuation failed'));
    });
    test('flocculation should be Medium', () => {
        hopTestPackage.getYeastAsync("WLP026 Premium Bitter Ale").then((yeast) => {
            expect(yeast?.flocculation).toBe("Medium");
        })
        .catch(() => fail('yeast flocculation failed'));
    });
});