'use strict';

const mix = require('../utils/utils').mix;

class M1 { constructor(n1) { this.n1 = n1; } m1() { console.log(`m1 ${this.n1}`); } }
class M2 { constructor(n2) { this.n2 = n2; } m2() { console.log(`m2 ${this.n2}`); } }

class A extends mix(M1, M2) {
    constructor(n1, n2, n3) {
        super(); // mandatory but not possible to pass correct parameters upward
        // There is no way in ES6 to call constructors for mixins M1, M2
        // like it could have been possible in ES5 (M1.call(this, ...), M2.call(this, ...)).
        // To work around this, one can use composition + delegation instead of mixins.
        // M1.constructor.call(this, n1); // useless
        // M2.constructor.call(this, n2); // useless
        this.n3 = n3;
    }

    a() { console.log(`a ${this.n3}`); }
}

let a = new A('M1', 'M2', 'A');
a.m1(); // m1 undefined
a.m2(); // m2 undefined
a.a(); // a A
