'use strict';

let symbol1 = Symbol();
let obj = {
    prop1: 'prop1Value',
    [symbol1]: 'symbol1Value'
};

console.log(Object.keys(obj)); // [ 'prop1' ]
console.log(Object.getOwnPropertyNames(obj)); // [ 'prop1' ]
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol() ]
console.log(Reflect.ownKeys(obj)); //[ 'prop1', Symbol() ]
