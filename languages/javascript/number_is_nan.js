'use strict';

/*
 http://exploringjs.com/es6/ch_numbers.html
 Four number-related functions are already available as global functions
 and have been added to Number, as methods:
 isFinite and isNaN, parseFloat and parseInt.
 All of them work almost the same as their global counterparts,
 but isFinite and isNaN don’t coerce their arguments to numbers, anymore,
 which is especially important for isNaN. 
*/


let x = NaN;

console.log(isNaN(x));
console.log(x !== x);
console.log(Number.isNaN(x));
console.log(isNaN('?'));
console.log(Number.isNaN('?'));

/*
 true
 true
 true
 true
 false
*/
