'use strict';

// ============== mix ==========================================

function mix(...mixins) {
    class Mix {}
    for (let mixin of mixins) {
        copyProperties(Mix, mixin); // static props
        copyProperties(Mix.prototype, mixin.prototype);
    }

    return Mix;
}

function copyProperties(target, source) {
    for (let key of Object.getOwnPropertyNames(source)) { // Reflect.ownKeys
        if (key !== "constructor" && key !== "prototype" && key !== "name") {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

// =================== object copy ==================================

// http://speakingjs.com/es5/ch17.html#code_copyOwnPropertiesFrom

function copyObject(orig) {
    // 1. copy has same prototype as orig
    var copy = Object.create(Object.getPrototypeOf(orig));
    // 2. copy has all of orig’s properties
    copyOwnPropertiesFrom(copy, orig);
    return copy;
}

function copyOwnPropertiesFrom(target, source) {
    Object.getOwnPropertyNames(source) // Reflect.ownKeys
        .forEach(function(propKey) {
            var desc = Object.getOwnPropertyDescriptor(source, propKey);
            Object.defineProperty(target, propKey, desc);
        });
    return target;
}

// =================== find bytes length for String ==================================

function getBytesLength(str) {
    return unescape(encodeURIComponent(str)).length;
}

// =================== encode/decode utf8 ==================================

function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}


// http://ecmanaut.blogspot.ro/2006/07/encoding-decoding-utf8-in-javascript.html
// http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
// http://monsur.hossa.in/2012/07/20/utf-8-in-javascript.html
// https://developer.mozilla.org/en-US/docs/Web/API/window.btoa#Unicode_Strings
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding

// =================== inheritance es5 ==================================

// http://dmitrysoshnikov.com/ecmascript/chapter-7-2-oop-ecmascript-implementation/
const inherit_1 = (function(){
    function F () {};
    return function (child, parent) {
        F.prototype = parent.prototype;
        child.prototype = new F;
        child.prototype.constructor = child;
        child.superproto = parent.prototype;
        return child;
    };
})();

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_Revisited
const inherit_2 = (function(){
    return function (child, parent) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;
        child.superproto = parent.prototype;
        return child;
    };
})();

const inherit_3 = (function(){
    // https://github.com/babel/babel/blob/8ab4a5df433accf65a127dfe357dae8ffd6f498b/packages/babel/src/transformation/templates/helper-inherits.js
    // https://github.com/FormidableLabs/radium/blob/master/src/enhancer.js
    var KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES = ['arguments', 'callee', 'caller', 'length', 'name', 'prototype', 'type'];
    function copyProperties(source, target) {
        Object.getOwnPropertyNames(source).forEach(function (key) {
            if (KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES.indexOf(key) < 0 && !target.hasOwnProperty(key)) {
                var descriptor = Object.getOwnPropertyDescriptor(source, key);
                Object.defineProperty(target, key, descriptor);
            }
        });
    }

    return function (subClass, superClass, IE) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        // for instance props
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        // for static props
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        IE && copyProperties(superClass, subClass); // for IE < 11
    }
})();



module.exports = {
    mix, copyProperties, copyObject, copyOwnPropertiesFrom,
    encode_utf8, decode_utf8, getBytesLength,
    inherit_1, inherit_2, inherit_3
};


