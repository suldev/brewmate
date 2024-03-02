import { BMMongo } from '../ts/mongodb'

describe('mongodb hop fetch test', () => {
    var hopTestPackage = new BMMongo('brewmate','password','192.168.1.10','brewmate');
    beforeAll(async() => {
        await hopTestPackage.connect();
    });
    test('length should result in 318', async() => {
        hopTestPackage.getHopNamesAsync().then((value) => {
            expect(value?.length).toBe(318);
        });
    });
    test('name should be Chinook', async() => {
        await hopTestPackage.getHopAsync('Chinook').then((value) => {
            expect(value?.name).toBe('Chinook');
        });
    });
    test('alphalo should be 11.5', async() => {
        await hopTestPackage.getHopAsync('Chinook').then((value) => {
            expect(value?.alphalo).toBe('11.5');
        });
    });
    test('alphahi should be 15', async() => {
        await hopTestPackage.getHopAsync('Chinook').then((value) => {
            expect(value?.alphahi).toBe('15');
        });
    });
    test('betalo should be 3.0', async() => {
        await hopTestPackage.getHopAsync('Chinook').then((value) => {
            expect(value?.betalo).toBe('3.0');
        }).catch((error) => {
            fail('hop betalo failed')
        });
    });
    test('betahi should be 4.0', async() => {
        await hopTestPackage.getHopAsync('Chinook').then((value) => {
            expect(value?.betahi).toBe('4.0');
        }).catch((error) => {
            fail('hop betahi failed')
        });
    });
    afterAll(async() => {
        await hopTestPackage.disconnect();
    });
});