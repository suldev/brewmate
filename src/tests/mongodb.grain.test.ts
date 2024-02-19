import { BMMongo } from '../ts/mongodb'

describe('mongodb grain fetch test', () => {
    var grainTestPackage = new BMMongo('brewmate','password','192.168.1.10','brewmate');
    grainTestPackage.connect();
    test('length should result in 89', () => {
        grainTestPackage.getGrainNamesAsync().then((names) => {
            expect(names?.length).toBe(89);
        }).catch(() => {
            fail('grain name count failed');
        });
    });
    test('name should be Caramel/Crystal Malt - 40L', () => {
        grainTestPackage.getGrainAsync('Caramel/Crystal Malt - 40L').then((value) => {
            expect(value?.name).toBe('Caramel/Crystal Malt - 40L');
        }).catch(() => {
            fail('grain name failed')
        });
    });
    test('colorSRM should be 40', () => {
        grainTestPackage.getGrainAsync('Caramel/Crystal Malt - 40L').then((value) => {
            expect(value?.colorSRM).toBe('40');
        }).catch(() => {
            fail('grain colorSRM failed')
        });
    });
    test('type should be Grain', () => {
        grainTestPackage.getGrainAsync('Caramel/Crystal Malt - 40L').then((value) => {
            expect(value?.type).toBe('Grain');
        }).catch(() => {
            fail('grain type failed')
        });
    });
    test('potential should be 1.034', () => {
        grainTestPackage.getGrainAsync('Caramel/Crystal Malt - 40L').then((value) => {
            expect(value?.potential).toBe('1.034');
        }).catch((error) => {
            console.error(error);
        });
    });
    afterAll(() => {
        grainTestPackage.disconnect();
    });
});