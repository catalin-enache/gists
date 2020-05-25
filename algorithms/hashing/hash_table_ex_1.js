'use strict';

/*
 if the size of the array can be up to half the number of elements to be
 stored, one should use separate chaining; but if the size of the array can be twice the size
 of the number of elements to be stored, one should use linear probing.
*/

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
        key = '' + key;
        const H = 37;
        let total = 0;
        for (let i = 0; i < key.length; ++i) {
            // https://brilliant.org/wiki/modular-arithmetic/
            // TODO: this might be improved
            total += H * total + key.charCodeAt(i);
        }
        total = total % this.table.length;
        return parseInt(total);
    }

    cyclicShiftHash(key) {
        const mask = (1 << 31) - 1;
        let h = 0;
        for (let i = 0; i < key.length; i++) {
            // moving first 5 h bits to the end
            h = (h << 5 & mask) | h >> 27;
            h += key.charCodeAt(i);
        }
        return h;
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
        this.table = new Array(length);
        this.values = new Array(length);
    }

    hash(key) {
        key = '' + key;
        const H = 37;
        let total = 0;
        for (let i = 0; i < key.length; ++i) {
            total += H * total + key.charCodeAt(i);
        }
        total = total % this.table.length;
        return parseInt(total);
    }

    put(key, data) {
        let hash = this.hash(key);
        while (this.table[hash] !== undefined && this.table[hash] !== key) {
            hash++;
            console.log('advanced for ', hash, 'for', key);
        }
        this.table[hash] = key;
        this.values[hash] = data;
    }

    get(key) {
        let hash = this.hash(key);
        while (this.table[hash] !== undefined && this.table[hash] !== key) {
            hash++;
            // console.log('advanced for ', hash, 'for', key);
        }
        return this.values[hash];
    }

    showDistribution() {
        let n = 0;
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i] !== undefined) {
                // console.log(i, this.table[i], this.values[i]);
                n += 1;
            }
        }
        return n;
    }
}

const data = ['David', 'David', 'Jennifer', 'Donnie', 'Raymond',
    'Cynthia', 'Mike', 'Clayton', 'Danny', 'Jonathan'];

const hTable = new HashTableSeparateChaining(11);
// const hTable = new HashTableLinearProbing(11);

data.forEach((name) => hTable.put(name, name));
data.forEach((name) => console.log(`key ${name}: `, hTable.get(name)));

const distributionLength = hTable.showDistribution();
console.log(`dataLength: ${data.length}, distributionLength: ${distributionLength}`);