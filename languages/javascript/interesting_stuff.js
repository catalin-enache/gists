'use strict';

console.log(Array.apply(null, {length: 6}).map((_, i) => i)); // [ 0, 1, 2, 3, 4, 5 ]
console.log(Array.from({length: 6}).map((_, i) => i)); // [ 0, 1, 2, 3, 4, 5 ]
console.log(Array.from({length: 26}, (v, k) => k + 97).map((c) => String.fromCharCode(c)).join(''));  // abcdefghijklmnopqrstuvwxyz


console.log(Array.prototype.slice.call('abcdefg', -3).join('')); // efg