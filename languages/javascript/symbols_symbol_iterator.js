'use strict';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

/*
 Whenever an object needs to be iterated (such as at the beginning of a for..of loop),
 its @@iterator method is called with no arguments, and the returned iterator
 is used to obtain the values to be iterated.
*/

let iterableObject = {
    [Symbol.iterator]() {
        let data = ['hello', 'world'];
        let index = 0;
        return {
            next() {
                if (index < data.length) {
                    return { value: data[index++] };
                } else {
                    return { done: true };
                }
            }
        };
    }
}
for (let x of iterableObject) {
    console.log(x);
}
// Output:
// hello
// world

let myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield* [1, 2, 3];
};
console.log([...myIterable]); // [1, 2, 3]
var myIterableIterator = myIterable[Symbol.iterator]();
console.log(myIterableIterator.next()); //{ value: 1, done: false }
console.log(myIterableIterator.next()); //{ value: 2, done: false }
console.log(myIterableIterator.next()); //{ value: 3, done: false }
console.log(myIterableIterator.next()); //{ value: undefined, done: true }



// ------------ Array
var someArray = [1, 5, 7];
var someArrayEntries = someArray.entries();

console.log(someArrayEntries.toString());           // "[object Array Iterator]"
console.log(someArrayEntries === someArrayEntries[Symbol.iterator]());    // true

// ------------ String
var someString = "hi";
console.log(typeof someString[Symbol.iterator]);          // "function"

var iterator = someString[Symbol.iterator]();
console.log(iterator + "");                               // "[object String Iterator]"

console.log(iterator.next());                             // { value: "h", done: false }
console.log(iterator.next());                             // { value: "i", done: false }
console.log(iterator.next());                             // { value: undefined, done: true }
// Some built-in constructs, such as the spread operator, use the same iteration protocol under the hood:
console.log([...someString]);                              // ["h", "i"]

// --- override string iterator
var otherString = new String("hi");          // need to construct a String object explicitly to avoid auto-boxing
otherString[Symbol.iterator] = function() {
    return { // this is the iterator object, returning a single element, the string "bye"
        next: function() {
            if (this._first) {
                this._first = false;
                return { value: "bye", done: false };
            } else {
                return { done: true };
            }
        },
        _first: true
    };
};
console.log(otherString + "");                              // "hi"
console.log([...otherString]);                              // ["bye"]





