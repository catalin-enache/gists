'use strict';
// http://www.mathcs.emory.edu/~cheung/Courses/323/Syllabus/Map/hash-func.html
// https://www.cpp.edu/~ftang/courses/CS240/lectures/hashing.htm
// https://brilliant.org/wiki/modular-arithmetic/
/*
 if the size of the array can be up to half the number of elements to be
 stored, one should use separate chaining; but if the size of the array can be twice the size
 of the number of elements to be stored, one should use linear probing.
*/

const polynomialHash = (key, length) => {
    const H = 37; // 33, 37, 39, 41
    let total = 0;
    for (let i = 0; i < key.length; ++i) {
        // https://brilliant.org/wiki/modular-arithmetic/
        // total += (H * total + key.charCodeAt(i)) % length;
        total = (H * total + key.charCodeAt(i)) % length;
    }
    total = total % length;
    return total;
}

const cyclicShiftHash = (key, length) => {
    const prime = 109345121;
    const scale = BigInt(1 + Math.floor(Math.random() * (prime - 1))); // scale from 1 to p-1 for MAD
    const shift = BigInt(Math.floor(Math.random() * (prime - 1))); // shift from 0 to p-1 for MAD

    const mask = (1n << 32n) - 1n;
    let hash = 0n;
    for (let i = 0; i < key.length; i++) {
        // It is shown that 5, 6, 7, 9, and 13 are good choices of shift values.
        // moving first 5 h bits to the end
        hash = (hash << 5n & mask) | hash >> 27n;
        hash += BigInt(key.charCodeAt(i));
    }
    // compress using MAD (Multiply Add Divide)
    const compressed = (hash * scale + shift) % BigInt(prime) % BigInt(length);
    return +('' + compressed);
}

class HashTableSeparateChaining {
    constructor(length = 137) {
        this.table = new Array(length);
        this._buildChains();
    }

    _buildChains() {
        for (let i = 0; i < this.table.length; ++i) {
            this.table[i] = new Array();
        }
    }

    hash(key) {
        // return polynomialHash(key, this.table.length);
        return cyclicShiftHash(key, this.table.length);
    }

    put(key, data) {
        let index = 0;
        let hash = this.hash(key);
        while (this.table[hash][index] !== undefined && this.table[hash][index] !== key) {
            index += 2;
        }
        this.table[hash][index] = key;
        this.table[hash][index+1] = data;
    }

    get(key) {
        let index = 0;
        let hash = this.hash(key);
        while (this.table[hash][index] !== undefined && this.table[hash][index] !== key) {
            index += 2;
        }
        return this.table[hash][index+1];
    }

    showDistribution() {
        let n = 0;
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i][0] !== undefined) {
                console.log(i, this.table[i]);
                n += Math.ceil(this.table[i].length / 2);
            }
        }
        return n;
    }
}

class HashTableLinearProbing {

    constructor(length = 137) {
        this.table = Array.from({ length }).map(() => null);
        this.values = Array.from({ length }).map(() => null);
    }

    hash(key) {
        // return polynomialHash(key, this.table.length);
        return cyclicShiftHash(key, this.table.length);
    }

    put(key, data) {
        let hash = this.hash(key);
        // console.log('put', hash, key);
        while (this.table[hash] !== null && this.table[hash] !== key) {
            hash = (hash + 1) % this.table.length;
            // console.log('put advanced to ', hash, 'for', key);
        }
        this.table[hash] = key;
        this.values[hash] = data;
    }

    get(key) {
        let hash = this.hash(key);
        while (this.table[hash] !== null && this.table[hash] !== key) {
            hash = (hash + 1) % this.table.length;
            // console.log('get advanced to ', hash, 'for', key);
        }
        return this.values[hash];
    }

    showDistribution() {
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i] !== null) {
                console.log(i, this.table[i], this.values[i]);
            }
        }
    }
}

const data = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
  .split(' ');
console.log('data length', data.length);

// const hTable = new HashTableSeparateChaining(11);
const hTable = new HashTableLinearProbing(data.length);

data.forEach((name) => hTable.put(name, name));
data.forEach((name) => console.log(`key ${name}: `, hTable.get(name)));

const distributionLength = hTable.showDistribution();
console.log(`dataLength: ${data.length}, distributionLength: ${distributionLength}`);
