import { getGrainAsync, getGrainNamesAsync } from '../ts/grain'

describe('testing getGrainNamesAsync', () => {
    test('length should result in 89', () => {
        getGrainNamesAsync().then((names) => {
            expect(names?.length).toBe(89);
        })
        .catch(() => fail('grain name count failed'));
    });
});

describe('testing getGrainAsync', () => {
    test('name should be Caramel/Crystal Malt - 40L', () => {
        getGrainAsync("Caramel/Crystal Malt - 40L").then((grain) => {
            expect(grain?.name).toBe("Caramel/Crystal Malt - 40L");
        })
        .catch(() => fail('grain name failed'));
    });
    test('colorSRM should be 40', () => {
        getGrainAsync("Caramel/Crystal Malt - 40L").then((grain) => {
            expect(grain?.colorSRM).toBe("40");
        })
        .catch(() => fail('grain colorSRM failed'));
    });
    test('type should be Grain', () => {
        getGrainAsync("Caramel/Crystal Malt - 40L").then((grain) => {
            expect(grain?.type).toBe("Grain");
        })
        .catch(() => fail('grain type failed'));
    });
    test('potential should be 1.034', () => {
        getGrainAsync("Caramel/Crystal Malt - 40L").then((grain) => {
            expect(grain?.potential).toBe("1.034");
        })
        .catch(() => fail('grain potential failed'));
    });
});