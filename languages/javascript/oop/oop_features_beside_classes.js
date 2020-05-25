'use strict';

// -------------- Method definitions

var obj = {
    myMethod(x, y) { console.log(x, y); },
    get foo() { console.log('GET foo'); return 123; },
    set bar(value) {
        console.log('SET bar to '+value);
        // return value is ignored
    },
    * myGeneratorMethod() { yield 1; },
    myGeneratorMethod2: function* () { yield 2; }
};

obj.myMethod(1,2); // 1 2
obj.foo; // GET foo
obj.bar = 8; // SET bar to 8
console.log(obj.myGeneratorMethod().next()); // { value: 1, done: false }
console.log(obj.myGeneratorMethod2().next()); // { value: 2, done: false }

// --------------- Property value shorthands

const first = 'Jane';
const last = 'Doe';
const obj2 = { first, last };
console.log(obj2); // { first: 'Jane', last: 'Doe' }

// Property value shorthands work well together with destructuring:
const obj21 = { x: 4, y: 1 };
const {x, y} = obj21;
console.log(x); // 4
console.log(y); // 1

// --------------- Computed property keys
// The main use case for computed property keys is to make it easy to use symbols as property keys.
const propKey = 'foo';
const obj3 = {
    [propKey]: true,
    ['b'+'ar']: 123,
    ['h'+'ello']() {
        return 'hi';
    }
};
console.log(obj3); // { foo: true, bar: 123, hello: [Function] }
console.log(obj3.hello()); // hi

const obj31 = {
    * [Symbol.iterator]() { // (A)
        yield 'hello';
        yield 'world';
    }
};
for (const x of obj31) {
    console.log(x);
}
// hello
// world

// --------------- New methods in Object

// -------- Object.assign(target, source_1, source_2, ···)
// The Object.assign() method only copies enumerable and own properties from a source object to a target object.
// It uses [[Get]] on the source and [[Put]] on the target, so it will invoke getters and setters
const obj4 = { foo: 123 };
Object.assign(obj4, { bar: true, [Symbol()]: 555 });
// console.log(Reflect.ownKeys(obj4)); // [ 'foo', 'bar', Symbol() ]
Reflect.ownKeys(obj4).forEach((k)=>{console.log(`${k.toString()}: ${obj4[k]}`)}); // foo: 123, bar: true, Symbol(): 555

// Use cases for Object.assign()

// 1. Adding properties to this
class Point {
    constructor(x, y) {
        Object.assign(this, {x, y});
    }
}

// 2. Providing default values for object properties
const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html'
};
function processContent(options) {
    options = Object.assign({}, DEFAULTS, options);
}

// 3. Adding methods to objects // think mixins
Object.assign(Point.prototype, {
    someMethod(arg1, arg2) {return arg1 + arg2;},
    anotherMethod() {}
});
for (let i in Point.prototype) { console.log(`${i}`) }; // someMethod anotherMethod
console.log((new Point()).someMethod(3,4)); // 7

// 4. Cloning objects
function clone(orig) {
    return Object.assign({}, orig);
}
// If you want the clone to have the same prototype as the original, you can use Object.getPrototypeOf() and Object.create():
function clone2(orig) {
    const origProto = Object.getPrototypeOf(orig);
    return Object.assign(Object.create(origProto), orig);
}

// ------------- Object.is(value1, value2)
console.log(NaN === NaN) ;// false
console.log(Object.is(NaN, NaN)); // true

console.log(-0 === +0); // true
console.log(Object.is(-0, +0)); // false

// Everything else is compared as with ===

// -------------- Iterating over property keys in ES6

var objX = {a: 'a'};
var objY = Object.assign(Object.create(objX), {b: 'b', [Symbol()]:'sym'});

// In general, a shorter name means that only enumerable properties are considered
// except: Reflect.enumerate()

// Object.keys retrieves all !string keys of all !enumerable own properties.
// A better name for Object.keys() would now be Object.names().
console.log(Object.keys(objY)); // [ 'b' ]
// Reflect.enumerate retrieves all !string keys of all !enumerable and !inherited properties [Deprecated]
// equiv with for..in loop
console.log(Reflect.enumerate(objY)); // [ 'b', 'a' ] ?
// Object.getOwnPropertyNames retrieves all string keys of all own properties
console.log(Object.getOwnPropertyNames(objY)); // [ 'b' ]
// Object.getOwnPropertySymbols retrieves all symbol keys of all own properties
// It complements Object.getOwnPropertyNames(), which retrieves all string-valued own property keys
console.log(Object.getOwnPropertySymbols(objY)); // [ Symbol() ]
// Reflect.ownKeys retrieves all keys of all own properties (PropertyNames + PropertySymbols)
// equiv with: Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))
console.log(Reflect.ownKeys(objY)); // [ 'b', Symbol() ]

// --------------- Assigning versus Defining properties
// Assigning
objX = { get a() { return 'a'; }, set b(v) { console.log(`setting b with ${v}`) } }
objY = Object.create(objX);
// objY.a = 9; // TypeError because in prototype this is readOnly # Cannot set property a of [object Object] which has only a getter
objY.b = 9; // 'setting b with 9' // calls prototype setter; does not add own property
console.log(objY.a); // a # as it is in prototype
console.log(objY.b); // still undefined

// Defining
// None of these previous cases prevent Object.defineProperty() from creating an own property
Object.defineProperty(objY, 'a', {value: 123}); // sets own property a
Object.defineProperty(objY, 'b', {value: 456}); // sets own property b
console.log(objY.a); // 123
console.log(objY.b); // 456

// ------------ __proto__ in ECMAScript 6 and [get|set]PrototypeOf()
// -------------- Object.setPrototypeOf(obj, proto)
// sets the prototype of obj to proto
// The non-standard way of doing so in ECMAScript 5, that is supported by many engines,
// is via assigning to the special property __proto__.
// because performance concerns the recommended way is doing this through: Object.create()

objX = { f() { console.log('objX#f'); }}
objY = Object.create(objX);
function F() { }
F.prototype.f = function(){ console.log('F#f'); }
var objW = new F();
var objZ = Object.create(F.prototype);

console.log(Object.getPrototypeOf(objY) === objX); // true
console.log(Object.getPrototypeOf(objW) === F.prototype); // true
console.log(Object.getPrototypeOf(objZ) === F.prototype); // true
console.log(objY.__proto__ === objX); // true
console.log(objW.__proto__ === F.prototype); // true
console.log(objZ.__proto__ === F.prototype); // true
console.log(Object.getPrototypeOf(objY) === objY.__proto__ ); // true
console.log(Object.getPrototypeOf(objW) === Object.getPrototypeOf(objZ) ); // true
objW.f(); // F#f

// in es6 __proto__ was standardized and deprecated
// setPrototypeOf should be used but it has performance penalties
// one should prefer Object.create(proto) instead of Object.setPrototypeOf(obj, proto)
Object.setPrototypeOf(objW, Object.getPrototypeOf(objY));
console.log(Object.getPrototypeOf(objW) === F.prototype); // false
console.log(Object.getPrototypeOf(objW) === objX); // true
objW.f(); // objX#f

// ----------- Property attributes

// All properties have the attributes
// - enumerable
// - configurable
// Normal properties (data properties, methods) have the attributes:
// - value
// - writable
// Accessors (getters/setters) have the attributes:
// - get
// - set

obj = { foo: 123 };
console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));
//prints:  {value: 123, writable: true, enumerable: true, configurable: true}

// Constructs affected by !enumerability:
// ECMAScript 5: for-in, Object.keys() JSON.stringify()
// ECMAScript 6: Object.assign(), Reflect.enumerate()

// for-in and Reflect.enumerate() are the only built-in operations where enumerability matters for inherited properties.
// All other operations only work with own properties.

// Instead of using enumerability to hide from JSON.stringify() one can use toJSON()
obj = {
    foo: 123,
    toJSON() {
        return { bar: 456 };
    }
};
console.log(JSON.stringify(obj)); // '{"bar":456}'

// ---------------- Customizing basic language operations via well-known symbols
// ----- Symbol.hasInstance (method)
// Lets an object C customize the behavior of x instanceof C.
// The only method in the standard library that has this key is:
//  - Function.prototype[Symbol.hasInstance]()
// Symbol.hasInstance property is non-writable and non-configurable
obj = {[Symbol.hasInstance](value){return true;}}
console.log(obj instanceof F); // true; actually it returns false because is not implemented neither in V8 or Babel

// ----- Symbol.toPrimitive (method)
// Lets an object customize how it is converted to a primitive value.
// This is the first step whenever something is coerced to a primitive type (via operators etc.).
// Is handled by the spec-internal operation ToPrimitive(), which has three modes:
// - Number(the caller needs a number) | obj.valueOf() then obj.toString()
// - String(the caller needs a siring) | obj.toString() then obj.valueOf()
// - Default(the caller needs either a number or a string) | works exactly like Number mode

obj = {
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'number':
                return 123;
            case 'string':
                return 'str';
            case 'default':
                return 'default';
            default:
                throw new Error();
        }
    }
};
// Symbol.toPrimitive only implemented in Chrome (not Node)
console.log(2 * obj); // 246
console.log(3 + obj); // '3default'
console.log(obj == 'default'); // true
console.log(String(obj)); // 'str'

// ----- Symbol.toStringTag (string)
// Called by Object.prototype.toString() to compute the default string description of an object obj:
// ‘[object ‘+obj[Symbol.toStringTag]+’]’.
// In ES5 and earlier, each object had the internal own property [[Class]] whose value hinted at its type
// You could not access it directly, but its value was part of the string returned by Object.prototype.toString()
// Before es6 one could use : Object.prototype.toString() as an alternative to typeof
// In ES6, there is no internal property [[Class]], anymore,
// and using Object.prototype.toString() for type checks is discouraged
// In order to ensure the backwards-compatibility of that method,
// the public property with the key Symbol.toStringTag was introduced.
// You could say that it replaces [[Class]].
// Object.prototype.toString() now works as follows:
//     - Convert this to an object obj.
//     - Determine the toString tag tst of obj.
//     - Return '[object ' + tst + ']'.
// All of the built-in properties whose keys are Symbol.toStringTag have the following property descriptor:
// {
//    writable: false,
//    enumerable: false,
//    configurable: true,
// }

console.log(({[Symbol.toStringTag]: 'Foo'}.toString())); // [object Foo]

// ----- Symbol.unscopables (Object)
// Lets an object hide some properties from the 'with' statement.