'use strict';

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

function minPriceForSevenDays(days) {
    return Math.min(7, days.reduce((acc, day) => acc + 2 * day, 0));
}

// TODO: optimise this
function minPriceForInterval(days) {

    const daysClone = [...days];
    const prices = [];
    while(daysClone.length) {
        prices.push(minPriceForSevenDays(daysClone.splice(-7)))
    }
    const pricesSum = prices.reduce((acc, day) => acc + day, 0);

    return pricesSum;
}

/**
 *
 * @param days: array of 0 and 1 representing travelling days
 * @returns number: minPrice
 */
function minPriceForDays(days) {

    const daysLength = days.length;
    let minPrice = 0;

    for (let i = 0; i < daysLength; i++) {
        if (!days[i]) continue;
        minPrice = Math.min(minPrice + 2, minPriceForInterval(days.slice(0, i + 1)));
    }

    return minPrice;
}

// time: n(n+1)/2 => O(n^2)
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

// [0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1]
// [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1]
// minPriceForInterval([0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1])




