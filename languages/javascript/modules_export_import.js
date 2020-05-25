'use strict';

import { doSomething, test, MyClass } from './../modules/module_1';
doSomething();
console.log(test);
new MyClass();

import {_} from 'lodash';
console.log(_.map([1, 2, 3], (n)=>n*4));

/*
 doing something in module 1
 es6 var
 ES6 Class!
 [ 4, 8, 12 ]
*/

