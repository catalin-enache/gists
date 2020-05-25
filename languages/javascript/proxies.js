'use strict';

// https://ponyfoo.com/articles/more-es6-proxy-traps-in-depth#construct
// http://stackoverflow.com/questions/9163341/multiple-inheritance-prototypes-in-javascript
// https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/

class M1 {
    constructor(n1) { this.n1 = n1; }
    m1() {console.log(`M1#m1 ${this.n1}`);}
}

class A {
    constructor(n3) { this.n3 = n3; }
    a() {console.log(`A#a ${this.n3}`);}
}

let obj = null;

var p = new Proxy(A, {
    construct: function(target, argumentsList, newTarget) {
        console.log(`construct:   ${target}, ${argumentsList.join(", ")}, ${newTarget.name}, ${newTarget === p}`);
        // return Reflect.construct(target, argumentsList, newTarget);
        const m1 = new M1(argumentsList[1])
        obj = new target(argumentsList[0]);
        obj.__m1 = m1;
        return obj;
    },
    get (target, prop, receiver) {
        // console.log('get: ', prop);
        // console.log('get: ', target, prop, receiver === p);
        // return Reflect.get(target, prop, receiver);
        if (prop === 'prototype') {
            return target.prototype;
        } else if (prop === 'name') {
            return target.name
        } else if (prop === 'xxx') {
            return receiver.a;
        } else if (typeof target.prototype[prop] === 'function') {
            return obj[prop].bind(obj);
        } else if (typeof obj.__m1[prop] === 'function') {
            return obj.__m1[prop].bind(obj.__m1);
        }
        return obj[prop] || obj.__m1[prop];

    },
    set (target, prop, value, receiver) {
        // console.log('set: ', prop);
        return obj[prop] = value;
    },
});

let p1 = new p(5, 7);
console.log(p1); // A { n3: 5, __m1: M1 { n1: 7 } }
p.a(); // A#a 5
p.n3 = 8;
p.xxx(); // redirects to p.a() // A#a 8
p.m1(); // M1#m1 7
console.log(p.n3, typeof p.n3); // 8 'number'
console.log(p.n1, typeof p.n1); // 7 'number'
console.log(p.n1 + p.n3); // 15