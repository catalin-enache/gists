'use strict';

// ==========================private stuff using WeakMap================================

// https://www.reddit.com/r/javascript/comments/3ezig4/using_es6_symbols_to_create_private_methods_and/ctkjcor

const map = new WeakMap();
const my = key => map.get(key) || map.set(key, {}).get(key);

class Foo {
    constructor() {
        my(this).privateProperty = 5;
        my(this).privateMethod = () => {
            return my(this).privateProperty;
        }
    }
    ['publicMethod']() {
        return my(this).privateMethod();
    }
}

const foo = new Foo();
console.log(foo.publicMethod()); // 5

// -------------------------------------------------------

// One WeakMap per private property
let _counter = new WeakMap();
let _action = new WeakMap();
class Countdown {
    constructor(counter, action) {
        _counter.set(this, counter);
        _action.set(this, action);
    }
    dec() {
        let counter = _counter.get(this);
        if (counter < 1) return;
        counter--;
        _counter.set(this, counter);
        if (counter === 0) {
            _action.get(this)();
        }
    }
}

// ==========================private stuff using Symbols================================

const _counter2 = Symbol();
const _action2 = Symbol();
class Countdown2 {
    constructor(counter, action) {
        this[_counter2] = counter;
        this[_action2] = action;
    }
    dec() {
        let counter = this[_counter2];
        if (counter < 1) return;
        counter--;
        this[_counter2] = counter;
        if (counter === 0) {
            this[_action2]();
        }
    }
}
// ============================computed property keys==============================

class A {
    ['do'+'Something']() {
        console.log(`doing something in ${this}`)
    }
}
var a = new A('Default');
a.doSomething(); // doing something in [object Object]





































