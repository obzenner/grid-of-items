import { sortByParam, filterNinjas } from '../src/helpers/NinjasHelpers';

describe('37 unit tests', () => {
    const testFixture = [
        {
            'name': 'Gustaf Lundström',
            'flagAndCity': '🇸🇪 Stockholm',
            'avatar': 'https://i.1337co.de/profile/gustaf-lundstrom-medium'
        },
        {
            'name': 'Niclas Fredriksson',
            'flagAndCity': '🇸🇪 Helsingborg',
            'avatar': 'https://i.1337co.de/profile/niclas-fredriksson-medium'
        },
        {
            'name': 'Ahmed Bazzara',
            'flagAndCity': '🇸🇪 Lund',
            'avatar': 'https://i.1337co.de/profile/ahmed-bazzara-medium'
        },
        {
            'name': 'Pontus Lögdahl',
            'flagAndCity': '🇸🇪 Stockholm',
            'avatar': 'https://i.1337co.de/profile/pontus-logdahl-medium'
        }
    ];

    it('sortByParam function', () => {
        const sortedByName = sortByParam(testFixture, 'name');

        expect(sortedByName[0].name).toEqual('Ahmed Bazzara');
        expect(sortedByName[sortedByName.length - 1].name).toEqual('Pontus Lögdahl');

        const sortedByLocation = sortByParam(testFixture, 'flagAndCity');
        expect(sortedByLocation[0].name).toEqual('Niclas Fredriksson');
        expect(sortedByLocation[sortedByLocation.length - 1].name).toEqual('Pontus Lögdahl');
    });
    it('filterNinjas function', () => {
        const filterValuesFixture = {
            name: 'n',
            flagAndCity: 'he'
        };

        const filteredNinjas = filterNinjas(testFixture, filterValuesFixture, ['name', 'flagAndCity']);
        expect(filteredNinjas[0].visible).toBe(false); // Gustaf in Stockholm
        expect(filteredNinjas[1].visible).toBe(true); // Niclas in Helsingborg
        expect(filteredNinjas[2].visible).toBe(false); // Ahmed in Lund
        expect(filteredNinjas[3].visible).toBe(false); // Pontus in Stockholm
    });
})