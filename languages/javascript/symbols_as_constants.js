'use strict';

const COLOR_RED    = Symbol('red');
const COLOR_GREEN   = Symbol('green');

function getComplement(color) {
    switch (color) {
        case COLOR_RED:
            return COLOR_GREEN;
        case COLOR_GREEN:
            return COLOR_RED;
        default:
            throw new Exception('Unknown color: '+color);
    }
}

console.log(getComplement(COLOR_RED));