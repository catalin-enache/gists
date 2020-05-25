'use strict';

class M1 { constructor(n1) { this.n1 = n1; } m1() { console.log(`m1 ${this.n1}`); } }
class M2 { constructor(n2) { this.n2 = n2; } m2() { console.log(`m2 ${this.n2}`); } }

class A {
    constructor(n1, n2, n3) {
        this._m1 = new M1(n1);
        this._m2 = new M2(n2);
        this.n3 = n3;
    }

    m1() { return this._m1.m1(); }

    m2() { return this._m2.m2(); }

    a() { console.log(`a ${this.n3}`); }
}

let a = new A('M1', 'M2', 'A');
a.m1(); // m1 M1
a.m2(); // m2 M2
a.a(); // a A