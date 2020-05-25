'use strict';

console.log(0.1 + 0.2 === 0.3); // false

// const EPSILON = Math.pow(2, -53);
function epsEqu(x, y) {
     // Number.EPSILON specifies a reasonable margin of error when comparing floating point numbers
    return Math.abs(x - y) < Number.EPSILON;
}

console.log(epsEqu(0.1+0.2, 0.3)); // true