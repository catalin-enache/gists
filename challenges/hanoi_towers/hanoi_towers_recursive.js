"use strict";

let moves = 0;

function move(_src, _dest, _aux, n) {
  if (n === 1) {
    moves += 1;
    _dest.push(_src.pop());
    console.log(src, dest, aux);
  }
  else if (n > 1) {
    move(_src, _aux, _dest, n - 1);
    move(_src, _dest, _aux, 1);
    move(_aux, _dest, _src, n - 1);
  }
}

const src = [3, 2, 1];
const dest = [];
const aux = [];


console.log(src, dest, aux);
const start = new Date().getTime();
move(src, dest, aux, src.length);
const finish = new Date().getTime();

console.log(moves, 'moves in', finish - start, 'ms')

