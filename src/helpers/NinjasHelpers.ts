import { sortBy } from 'lodash';
import type { Ninja } from '../../utils/generate-grid-items';

// Sort and filter functions: TODO => Sort and filter functions: Move to folders and write tests
const sortByParam = (data: Ninja[] | null, sortParam: string) => {
    return sortBy(data, sortParam);
}

// TODO: Improve performance
const filterNinjas = (data: Ninja[] | null, filterValues: { [key: string]: string }, filterParams: string[]) => {
    return data.reduce((acc, ninja) => {
        // go through the sort params, check if they match and write result to accumulator
        const isAMatch = filterParams.reduce((match, param) => {
            const validator = ninja[param].toLowerCase().includes(filterValues[param].toLowerCase());
            match = [...match, validator];
            return match;
        }, []);

        // if all values in accumulator add up to boolean, set the "visible" attribute to true
        ninja.visible = isAMatch.every(v => Boolean(v));

        return [...acc, ninja];
    }, []);
}

export {
    sortByParam,
    filterNinjas
}