'use strict';

/*
https://leetcode.com/discuss/interview-question/algorithms/124720/tickets-needed-to-get-minimum-cost

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


function minPriceForDays(days) {
    const _days = new Set(days.map((d) => d));
    const table = Array(31).fill(0);

    for (let i = 0; i < 31; i++) {
        if (_days.has(i)) {
            const p1 = table[i - 1] + 2; // buy 1 day ticket
            let p2 = p1;
            if (p1 % 7 > 0) {
                const intervalStartIndex = Math.max(i - 6, 0);
                const spentForLastInterval = p1 - table[intervalStartIndex];
                const spentUntilLastInterval = table[Math.max(intervalStartIndex - 1, 0)];
                if (spentForLastInterval >= 7 ) {
                    p2 = 7 + spentUntilLastInterval;
                }
            }
            if (p1 % 25 > 0) {
                const intervalStartIndex = Math.max(i - 29, 0);
                const spentForLastInterval = p1 - table[intervalStartIndex];
                const spentUntilLastInterval = table[Math.max(intervalStartIndex - 1, 0)];
                if (spentForLastInterval >= 25 ) {
                    p2 = 25 + spentUntilLastInterval;
                }
            }

            table[i] = p2;
        } else if (i > 0) {
            table[i] = table[i - 1];
        }
    }

    // console.log(table.join(', '));
    return table[30];
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


console.log(minPriceForDays(months[0]) === 11);
console.log(minPriceForDays(months[1]) === 2);
console.log(minPriceForDays(months[2]) === 4);
console.log(minPriceForDays(months[3]) === 6);
console.log(minPriceForDays(months[4]) === 9);
console.log(minPriceForDays(months[5]) === 9);
console.log(minPriceForDays(months[6]) === 14);
console.log(minPriceForDays(months[7]) === 18);
console.log(minPriceForDays(months[8]) === 23);
console.log(minPriceForDays(months[9]) === 25);
console.log(minPriceForDays(months[10]) === 25);


