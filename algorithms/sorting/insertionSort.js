'use strict';

export function insertionSort(list) {
  for (let i = 1; i < list.length; i++) {
    const up = list[i];
    let j = i - 1;
    while (j >= 0 && list[j] > up) {
        list[j + 1] = list[j]; // shift up
        j--;
    }
    list[j +  1] = up;
  }
}

// const list = [5, 9, 4, 7, 8, 6, 0, 1, 3, 2];
// insertionSort(list);
// console.log(list);