'use strict';

function qSort(list) {
  if (list.length === 0) return [];
  const lesser = [];
  const greater = [];
  const pivot = list[0]; // or pivot can be chosen randomly
  for (let i = 1; i < list.length; i++) {
    if (list[i] < pivot) {
      lesser.push(list[i]);
    } else {
      greater.push(list[i]);
    }
  }
  return qSort(lesser).concat(pivot, qSort(greater));
}

function qSortLinked(list) {
  if (list.length < 2) return;
  const p = list.first();
  const left = new LinkedQueue();
  const equal = new LinkedQueue();
  const right = new LinkedQueue();

  while (!list.isEmpty()) {
    if (list.first() < p) {
      left.enqueue(list.dequeue());
    } else if (list.first() > p) {
      right.enqueue(list.dequeue());
    } else {
      equal.enqueue(list.dequeue());
    }
  }

  qSortLinked(left);
  qSortLinked(right);

  while (!left.isEmpty()) list.enqueue(left.dequeue());
  while (!equal.isEmpty()) list.enqueue(equal.dequeue());
  while (!right.isEmpty()) list.enqueue(right.dequeue());
}

function qSortInPlace(list, a = 0, b = list.length - 1) {
  // Sort the list from S[a] to S[b] inclusive using the quick-sort algorithm
  if (a >= b) return; // range is trivially sorted
  let pivot = list[b]; // last element of range is pivot
  let [left, right] = [a, b - 1]; // left/right scan rightward/leftward

  while (left <= right) {
    // scan until reaching value equal or larger than pivot (or right marker)
    while (left <= right && list[left] < pivot) {
      left += 1;
    }
    // scan until reaching value equal or smaller than pivot (or left marker)
    while (left <= right && list[right] > pivot) {
      right -= 1;
    }
    if (left <= right) { // scans did not strictly cross
      [list[left], list[right]] = [list[right], list[left]]; // swap values
      [left, right] = [left + 1, right - 1]; // shrink range
    }
  }
  // put pivot into its final place (currently marked by left index)
  [list[left], list[b]] = [list[b], list[left]];
  // make recursive calls
  qSortInPlace(list, a, left - 1);
  qSortInPlace(list, left + 1, b);
}

console.log(qSort([3, 4, 1, 0, 2, 5, 9, 3, 7, 0]));
const l = [3, 4, 1, 0, 2, 5, 9, 3, 7, 0];
qSortInPlace(l);
console.log(l);