'use strict';

// http://exploringjs.com/es6/ch_destructuring.html

let obj = { first: 'Jane', last: 'Doe' };
let { first: a, last: b } = obj; // // a = 'Jane'; b = 'Doe'

let [c, d] = ['a', 'b']; // c = 'a'; d = 'b'

let [e] = ['a'];
const [f] = ['a'];
var [g] = ['a'];


// Parameter definitions:
function func([i]) { }
func(['a']);


let arr1 = ['a', 'b'];
for (let [index, element] of arr1.entries()) {
    console.log(index, element);
}
// Output:
// 0 a
// 1 b

let arr2 = [
    {name: 'Jane', age: 41},
    {name: 'John', age: 40},
];
for (let {name: n, age: a} of arr2) {
    console.log(n, a);
}
// Output:
// Jane 41
// John 40


let obj2 = { a: [{ foo: 123, bar: 'abc' }, {}], b: true };
let { a: [{foo: ff}] } = obj2; // ff = 123

let [x,...y] = 'abc'; // x='a'; y=['b', 'c']
// let [x,y,z] = 'a\uD83D\uDCA9c'; // x='a'; y='\uD83D\uDCA9'; z='c'
// let [x,y] = new Set(['a', 'b']); // x='a'; y='b’;

function* allNaturalNumbers() {
    for (let n = 0; ; n++) {
        yield n;
    }
}
let [xx, yy, zz] = allNaturalNumbers(); // x=0; y=1; z=2

[x] = { * [Symbol.iterator]() { yield 1 } }; // OK, iterable


// --------- defaults
var {foo: xxx=3, bar: yyy} = {}; // xxx = 3; yyy = undefined
// let [x=1] = [undefined]; // x = 1
// let {prop: y=2} = {prop: undefined}; // y = 2
// let {prop: y=someFunc()} = someValue;
// let [x=3, y=x] = [];     // x=3; y=3
// let [x=3, y=x] = [7];    // x=7; y=7
// let [x=3, y=x] = [7, 2]; // x=7; y=2
// let [x=y, y=3] = []; // ReferenceError

// If the part has no match in the source, destructuring continues with the default value
// let [{ prop: x } = {}] = [];
// The element at index 0 has no match, which is why destructuring continues with:
// let { prop: x } = {}; // x = undefined

// ---------- shorthands
// let { x, y } = { x: 11, y: 8 }; // x = 11; y = 8
// let { x, y = 1 } = {}; // x = undefined; y = 1

// --------- computed property keys
const FOO = 'foo';
let { [FOO]: j } = { foo: 123 }; // j = 123

const KEY = Symbol();
let obj3 = { [KEY]: 'abc' };
let { [KEY]: k } = obj3; // k = 'abc'

// Extract Array.prototype[Symbol.iterator]
let { [Symbol.iterator]: func2 } = [];
console.log(typeof func2); // function

// ----------- other features
// let [,,x] = ['a', 'b', 'c', 'd']; // x = 'c'
// let [x, ...y] = ['a', 'b', 'c']; // x='a'; y=['b', 'c']
// let [x, y, ...z] = ['a']; // x='a'; y=undefined; z=[]
// let [x, ...[y, z]] = ['a', 'b', 'c'];// x = 'a'; y = 'b'; z = 'c'
// The spread operator (...) looks exactly like the rest operator,
// but it is used inside function calls and Array literals (not inside destructuring patterns).

// let obj = {};
// let arr = [];
// ({ foo: obj.prop, bar: arr[0] }) = { foo: 123, bar: true };
// console.log(obj); // {prop:123}
// console.log(arr); // [true]

// let obj = {};
// [first, ...obj.rest] = ['a', 'b', 'c'];// first = 'a'; obj.rest = ['b', 'c']


// let [, year, month, day] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('2999-12-31') || [];

function findElement(array, predicate) {
    for (let [index, element] of array.entries()) {
        if (predicate(element)) {
            return { element, index };
        }
    }
    return { element: undefined, index: -1 };
}
let arr = [7, 8, 6];
let {element, index} = findElement(arr, x => x % 2 === 0); // element = 8, index = 1

function move1({x=0, y=0} = {}) { // {x, y} = { x: 0, y: 0 } ! not suited alternative !
    return [x, y];
}
move1({x: 3, y: 8}); // [3, 8]
move1({x: 3}); // [3, 0]
move1({}); // [0, 0]
move1(); // [0, 0]
move1({z: 3}); // [0, 0]


