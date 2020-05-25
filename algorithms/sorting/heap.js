'use strict';

// heap ADT can be used to implement a priority queue

const getLeft = (i) => 2 * i + 1;
const getRight = (i) => 2 * i + 2;
const getParent = (i) => Math.floor((i - 1) / 2);
const getLast = (list) => list.length - 1;
const swap = (list, i, j) => { const tmp = list[i]; list[i] = list[j]; list[j] = tmp; };

// if min(left, right) < current node swap current node with min(left, right)
const downHeap = (list, i) => {
  const currVal = list[i];
  if (currVal === undefined) return;
  const leftIdx = getLeft(i);
  const leftVal = list[leftIdx];
  const rightIdx = getRight(i);
  const rightVal = list[rightIdx];
  let minChildIdx = leftVal < rightVal ? leftIdx : rightIdx;
  // downHeap starts from last parent which implies leftChild is guaranteed to exist.
  if (rightVal === undefined) minChildIdx = leftIdx;
  const minChildValue = list[minChildIdx];
  if (currVal > minChildValue) {
    swap(list, i, minChildIdx);
  }
  downHeap(list, minChildIdx);
};


// if parent > current node swap them
const upHeap = (list, i) => {
  const currVal = list[i];
  const parentIdx = getParent(i);
  if (parentIdx < 0) return;
  const parentVal = list[parentIdx];
  if (currVal < parentVal) {
    swap(list, i, parentIdx);
  }
  upHeap(list, parentIdx);
};

const bubble = (list, i) => {
  if (i > 0 && list[i] < list[getParent(i)]) {
    upHeap(list, i)
  } else {
    downHeap(list, i)
  }
};

export const update = (list, i, value) => {
  list[i] = value;
  bubble(list, i);
};


// swap current node with last one then upHeap or downHeap
export const remove = (list, i) => {
  if (i === getLast(list)) return list.pop();
  swap(list, i, getLast(list));
  const ret = list.pop();
  bubble(list, i);
  return ret;
};

// from last parent to root downHeap
export const heapify = (list) => {
  const lastParent = getParent(getLast(list));
  for (let i = lastParent; i > -1; i--) downHeap(list, i);
};

export const removeMin = (list) => {
  if (list.length === 0) return null;
  const lastIdx = getLast(list);
  swap(list, 0, lastIdx);
  const ret = list.pop();
  downHeap(list, 0);
  return ret;
};

export const add = (list, val) => {
  list.push(val);
  upHeap(list, getLast(list));
};

export const findIndex = (list, value) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === value) return i;
  }
  return -1;
};

