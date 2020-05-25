'use strict';

var aGeneratorObject = function*(){
    yield 1;
    yield 2;
    yield 3;
}();

// true, because its @@iterator method return its self (an iterator)
console.log(aGeneratorObject[Symbol.iterator]() === aGeneratorObject);
for (let v of aGeneratorObject) {
    console.log(v); // 1 2 3
}

var gen1 = function*(){
    yield* [1, 2, 3];
}();
console.log([...gen1]); // [1, 2, 3]
console.log([...gen1]); // [] # consumed

var gen2 = function*(){
    yield* [1, 2];
}();
console.log(gen2.next()); // { value: 1, done: false }
console.log(gen2.next()); // { value: 2, done: false }
console.log(gen2.next()); // { value: undefined, done: true }



