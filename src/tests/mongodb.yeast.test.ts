import { BMMongo } from '../ts/mongodb'

describe('mongodb yeast fetch test ', () => {
    var yeastTestPackage = new BMMongo('brewmate','password','192.168.1.10','brewmate');
    beforeAll(async() => {
        await yeastTestPackage.connect();
    });
    test('length should result in 232', async() => {
        await yeastTestPackage.getYeastNamesAsync().then((value) => {
            expect(value?.length).toBe(232);
        })
    });
    test('name should be WLP026 Premium Bitter Ale', async() => {
        await yeastTestPackage.getYeastAsync("WLP026 Premium Bitter Ale").then((value) => {
            expect(value?.name).toBe("WLP026 Premium Bitter Ale");
        })
    });
    test('type should be Ale', async() => {
        await yeastTestPackage.getYeastAsync("WLP026 Premium Bitter Ale").then((value) => {
            expect(value?.type).toBe("Ale");
        })
    });
    test('templo should be 67', async() => {
        await yeastTestPackage.getYeastAsync("WLP026 Premium Bitter Ale").then((value) => {
            expect(value?.templo).toBe("67");
        })
    });
    test('temphi should be 70', async() => {
        await yeastTestPackage.getYeastAsync("WLP026 Premium Bitter Ale").then((value) => {
            expect(value?.temphi).toBe("70");
        })
    });
    test('attenuation should be 72.5', async() => {
        await yeastTestPackage.getYeastAsync("WLP026 Premium Bitter Ale").then((value) => {
            expect(value?.attenuation).toBe("72.5");
        })
    });
    test('flocculation should be Medium', async() => {
        await yeastTestPackage.getYeastAsync("WLP026 Premium Bitter Ale").then((value) => {
            expect(value?.flocculation).toBe("Medium");
        })
    });
    afterAll(async() => {
        await yeastTestPackage.disconnect();
    });
});