'use strict';

function qSort(list) {
  if (list.length === 0) return [];
  const lesser = [];
  const greater = [];
  const pivot = list[0];
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

console.log(qSort([3, 4, 1, 0, 2, 5, 9]));