import { getGrainAsync, getGrainNamesAsync } from '../ts/grain'

describe('testing getGrainNamesAsync', () => {
    test('length should result in 89', () => {
        getGrainNamesAsync().then((names) => {
            expect(names?.length).toBe(89);
        });
    });
});

describe('testing getGrainAsync', () => {
    test('name should be Caramel/Crystal Malt - 40L', () => {
        getGrainAsync("Caramel/Crystal Malt - 40L").then((grain) => {
            expect(grain?.name).toBe("Caramel/Crystal Malt - 40L");
        });
    });
    test('colorSRM should be 40', () => {
        getGrainAsync("Caramel/Crystal Malt - 40L").then((grain) => {
            expect(grain?.colorSRM).toBe("40");
        });
    });
    test('type should be Grain', () => {
        getGrainAsync("Caramel/Crystal Malt - 40L").then((grain) => {
            expect(grain?.type).toBe("Grain");
        });
    });
    test('potential should be 1.034', () => {
        getGrainAsync("Caramel/Crystal Malt - 40L").then((grain) => {
            expect(grain?.potential).toBe("1.034");
        });
    });
});