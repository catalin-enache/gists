
function A(n1) { this.n1 = n1; }
A.prototype.a = function() { return `A#a ${this.n1}`; };

function B(n2) { this.n2 = n2; }
B.prototype.b = function() { return `B#b ${this.n2}`; };

function C(n1, n2, n3) {
    // if A or B would be ES6 classes we could not do this
    // as ES6 classes require using 'new'
    A.call(this, n1);
    B.call(this, n2);
    this.n3 = n3;
}
C.prototype.c = function() { return `C#c ${this.n3}`; };

const chain = Object.assign({}, A.prototype, B.prototype, C.prototype);
Object.keys(chain).forEach((prop) => {
    Object.defineProperty(C.prototype, prop, Object.getOwnPropertyDescriptor(chain, prop));
});

// C.prototype = Object.create(Object.assign({}, A.prototype, B.prototype, C.prototype));
// C.prototype = Object.assign({}, A.prototype, B.prototype, C.prototype);
// C.prototype.constructor = C;

let c = new C('A', 'B', 'C');
console.log(c.a()); // A#a A
console.log(c.b()); // B#b B
console.log(c.c()); // C#c C
console.log(c instanceof C); // true