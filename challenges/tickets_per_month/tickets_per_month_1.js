'use strict';

/*
Challenge description:

A month has 30 days and you'll travel in some of these days.
In this regard you need to by tickets

1-day ticket,  costs 2  - valid for one day
7-day ticket,  costs 7  - valid for seven consecutive days
30-day ticket, costs 25 - valid for thirty days of month

An array, representing the days you'll travel will be given. Ex: [1, 2, 4, 5, 7, 29, 30]

For this array the min price is: 1 * 7 day ticket + 2 * 1 day ticket => costs 11

Write a function which will receive an array of positive integers
up to 30 items representing the travelling days.

The function should return the minimum cost.

For the array given before it should return 11.
*/

/**
 * Helper which converts an array of travelling days into an array having 30 elements of 0 and 1
 * @param days
 * @returns {Array}
 */
function toBinary(days) {

    const res = [];

    for (let i = 0; i < 30; i++) {
        res[i] = 0;
    }

    for (let j = 0; j < days.length; j++) {
        res[days[j] - 1] = 1;
    }

    return res;
}

/**
 * ranges derived from days per week multiplied by fibonacci numbers
 * @type {Array}
 */
const ranges = [1, 2, 3, 5].map((num) => num * 7); // [7, 14, 21, 35]

/**
 *
 * @param days: array of 0 and 1 representing travelling days
 * @returns number: minPrice
 */
function minPriceForDays(days) {

    const daysLength = days.length;

    if (daysLength <= 7) {
        return Math.min(7, days.reduce((acc, day) => acc + 2 * day, 0));
    }

    for (let rangeIndex = 0; rangeIndex < ranges.length - 1; rangeIndex++) {

        const range = ranges[rangeIndex];
        const nextRange = ranges[rangeIndex + 1];

        if (daysLength <= nextRange) {

            const possibleResults = [];

            for (let rangeStart = 0, rangeEnd = rangeStart + range; rangeEnd <= daysLength; rangeStart++, rangeEnd++) {
                // ... moving a range from left to right.
                // like in the following visualisation: .. 1 0 | 1 0 1 1 0 0 1 | 0 0 .. => .. 1 0 1 | 0 1 1 0 0 1 0 | 0 ..
                // At each step we take the sum of: minPrice for what's before range + minPrice for the range + minPrice for what's after range
                // Each sum is stored in possibleResults then at the end we return the min result from it.
                // This is done recursively. Each range knows how to extract min price for itself by eventually recursing into sub-ranges.
                // If for example daysLength would be <= 35 the tests will run against a range of 21 surrounded by 14 elements
                // If daysLength would be <= 21 the tests will run against a range of 14 surrounded by 7 elements
                // Initial position will be: 0, 14, 7
                // Next position will be: 1, 14, 7
                // Next position will be: 2, 14, 6
                // Last position will be: 14, 7, 0
                // If daysLength would be <= 14 the tests will run against a range of 7 surrounded by 7 elements
                // If daysLength would be <= 7 the minPrice can be returned for this range
                possibleResults.push(
                    minPriceForDays(days.slice(0, rangeStart)) +
                    minPriceForDays(days.slice(rangeStart, rangeEnd)) +
                    minPriceForDays(days.slice(rangeEnd, daysLength))
                );

            }

            return Math.min(...possibleResults);
        }
    }

    return 0;
}

function solution(days) {
    if (days.length >= 23) return 25;
    const binArray = toBinary(days);
    return minPriceForDays(binArray);
}


const months = [
    [1, 2, 4, 5, 7, 29, 30], // => 11 // original example
    [5], // => 2
    [5, 7], // => 4
    [5, 6, 8], // => 6
    [15, 16, 17, 18, 19, 20, 21, 22], // => 9
    [2, 6, 7, 8, 9, 10], // => 9 // should take the right side
    [1, 2, 5, 6, 7, 8, 9, 10, 12, 13], // => 14 // should not take from middle even is max possible but should split in two
    [1, 2, 5, 6, 7, 8, 9, 10, 12, 13, 15, 16, 17], // => 18
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23], // => 23
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], // => 25
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], // => 25
];

const start = (new Date()).getTime();
months.forEach((days) => {
    console.log(days.join(' '), '=>', solution(days));
});
const end = (new Date()).getTime();
console.log('time: ', end - start, 'ms');




