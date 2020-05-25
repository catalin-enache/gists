import {add, heapify, remove, removeMin, update} from './heap.js';


const list = [3, 2, 5, 7, 4, 1, 9, 0];
heapify(list);
console.log(list); // [ 0, 2, 1, 3, 4, 5, 9, 7 ]
console.log(removeMin(list)); // 0
console.log(list); // [ 1, 2, 5, 3, 4, 7, 9 ]
add(list, 0);
console.log(list); // [ 0, 1, 5, 2, 4, 7, 9, 3 ]
update(list, 3, 6);
console.log(list); // [ 0, 1, 5, 3, 4, 7, 9, 6 ]
remove(list, 1);
console.log(list); // [0, 3, 5, 6, 4, 7, 9]
for (let rem = true; rem !== null; rem = removeMin(list)) console.log(rem);