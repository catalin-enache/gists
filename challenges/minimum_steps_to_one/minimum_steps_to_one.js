'use strict';

/*
Problem Statement:
On a positive integer, you can perform any one of the following 3 steps.
1.) Subtract 1 from it. ( n = n - 1 )  ,
2.) If its divisible by 2, divide by 2. ( if n % 2 == 0 , then n = n / 2  )  ,
3.) If its divisible by 3, divide by 3. ( if n % 3 == 0 , then n = n / 3  ).
Now the question is, given a positive integer n, find the minimum number of steps that takes n to 1
*/

// top to bottom with recursion and memoize/cache
function minStepsToOne(num, cache=[]) {

    if (num === 1) return 0;

    if (cache[num]) return cache[num];


    let res = 1 + minStepsToOne(num - 1, cache);

    if (num % 2 === 0) res = Math.min(res, 1 + minStepsToOne(Math.floor(num/2), cache));

    if (num % 3 === 0) res = Math.min(res, 1 + minStepsToOne(Math.floor(num/3), cache));

    cache[num] = res;

    return res;

}

// bottom to top with dynamic programming
function minStepOneDP(num) {
    const table = Array(num + 1).fill(0);

    table[1] = 0;
    
    for (let i = 2; i <= num; i++) {
        table[i] = table[i - 1] + 1;
        if (i % 2 === 0) {
            table[i] = Math.min(table[i], table[i/2] + 1)
        }
        if (i % 3 === 0) {
            table[i] = Math.min(table[i], table[i/3] + 1)
        }
    }

    return table[table.length - 1];
}

console.log(minStepsToOne(10));
console.log(minStepOneDP(10));