'use strict';

// Default parameter values:
function f1(x=0, y=0) {}

// Rest parameters:
function f2(a, ...params) {}

// Named parameters via destructuring:
function f3({ start=0, end=-1, step=1 } = {}) {
    // The object pattern is an abbreviation of:
    // { start: start=0, end: end=-1, step: step=1 }
    // Use the variables `start`, `end` and `step` here
}
f3({ start: 10, end: 30, step: 2 });
f3({ step: 3 });
f3({});
f3();


// Spread operator (...)

Math.max(...[-1, 5, 11, 3]);

// [1, ...[2,3], 4] // => [1, 2, 3, 4]

function foo(...args) {
    let [x=0, y=0] = args;
    console.log('Arity: '+args.length);
}

function bar(options = {}) {
    let { namedParam1, namedParam2 } = options;
    if ('extra' in options) {}
}

[1,2,3].map(x => 2 * x);
[[1,2], [3,4]].map(([a,b]) => a + b);
[1, undefined, 3].map((x='yes') => x); // [ 1, 'yes', 3 ]

let items = [ ['foo', 3], ['bar', 9] ];
items.forEach(([word, count]) => {
    console.log(word+' '+count);
});

items = [
    { word:'foo', count:3 },
    { word:'bar', count:9 },
];
items.forEach(({word, count}) => {
    console.log(word+' '+count);
});

let map0 = new Map([
    [1, 'a'],
    [2, 'b'],
    [3, 'c'],
]);

let map1 = new Map( // step 3
    [...map0] // step 1
        .map(([k, v]) => [k*2, '_'+v]) // step 2
);
// Resulting Map: {2 -> '_a', 4 -> '_b', 6 -> '_c'}
console.log(...map1); // [ 2, '_a' ] [ 4, '_b' ] [ 6, '_c' ]
