import { BMMongo } from '../ts/mongodb'

describe('mongodb hop fetch test', () => {
    var hopTestPackage = new BMMongo('brewmate','password','192.168.1.10','brewmate');
    hopTestPackage.connect();
    test('length should result in 318', () => {
        hopTestPackage.getHopNamesAsync().then((names) => {
            expect(names?.length).toBe(318);
        }).catch(() => {
            fail('hop name count failed');
        });
    });
    test('name should be Chinook', () => {
        hopTestPackage.getHopAsync('Chinook').then((value) => {
            expect(value?.name).toBe('Chinook');
        }).catch(() => {
            fail('hop name failed')
        });
    });
    test('alphalo should be 11.5', () => {
        hopTestPackage.getHopAsync('Chinook').then((value) => {
            expect(value?.alphalo).toBe('11.5');
        }).catch(() => {
            fail('hop alphalo failed')
        });
    });
    test('alphahi should be 15', () => {
        hopTestPackage.getHopAsync('Chinook').then((value) => {
            expect(value?.alphahi).toBe('15');
        }).catch(() => {
            fail('hop alphahi failed')
        });
    });
    test('betalo should be 3.0', () => {
        hopTestPackage.getHopAsync('Chinook').then((value) => {
            expect(value?.betalo).toBe('3.0');
        }).catch((error) => {
            fail('hop betalo failed')
        });
    });
    test('betahi should be 4.0', () => {
        hopTestPackage.getHopAsync('Chinook').then((value) => {
            expect(value?.betahi).toBe('4.0');
        }).catch((error) => {
            fail('hop betahi failed')
        });
    });
    afterAll(() => {
        hopTestPackage.disconnect();
    });
});