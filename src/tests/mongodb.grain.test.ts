import { BMMongo } from '../ts/mongodb'

describe('mongodb grain fetch test', () => {
    var grainTestPackage = new BMMongo('brewmate','password','192.168.1.10','brewmate');
    grainTestPackage.connect();
    
    test('length should result in 89', async() => {
        await grainTestPackage.getGrainNamesAsync().then((value) => {
            expect(value?.length).toBe(89);
        });
    });
    test('name should be Caramel/Crystal Malt - 40L', async() => {
        await grainTestPackage.getGrainAsync('Caramel/Crystal Malt - 40L').then((value) => {
            expect(value?.name).toBe('Caramel/Crystal Malt - 40L');
        });
    });
    test('colorSRM should be 40', async() => {
        await grainTestPackage.getGrainAsync('Caramel/Crystal Malt - 40L').then((value) => {
            expect(value?.colorSRM).toBe('40');
        });
    });
    test('type should be Grain', async() => {
        await grainTestPackage.getGrainAsync('Caramel/Crystal Malt - 40L').then((value) => {
            expect(value?.type).toBe('Grain');
        });
    });
    test('potential should be 1.034', async() => {
        await grainTestPackage.getGrainAsync('Caramel/Crystal Malt - 40L').then((value) => {
            expect(value?.potential).toBe('1.034');
        }).catch((error) => {
            console.error(error);
        });
    });
    afterAll(async() => {
        await grainTestPackage.disconnect();
    });
});