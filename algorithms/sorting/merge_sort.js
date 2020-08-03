'use strict';

function merge(left, right, list) {
  let [i, j] = [0, 0];
  while (i + j < list.length) {
    if (i < left.length && left[i] < right[j] || j === right.length) {
      list[i + j] = left[i];
      i++;
    } else {
      list[i + j] = right[j];
      j++;
    }
  }
}

function mergeSort(list) {
  if (list.length < 2) return;
  const middle = Math.floor(list.length / 2);
  const left = list.slice(0, middle);
  const right = list.slice(middle);
  mergeSort(left);
  mergeSort(right);
  merge(left, right, list);
}

function mergeLinked(left, right, list) {
  while (!left.isEmpty() && !right.isEmpty()) {
    if (left.first() < right.first()) {
      list.enqueue(left.dequeue());
    } else {
      list.enqueue(right.dequeue());
    }
  }
  // Move remaining items.
  while (!left.isEmpty()) list.enqueue(left.dequque());
  while (!right.isEmpty()) list.enqueue(right.dequque());
}

function mergeSortLinked(list) {
  const n = list.length;
  if (n < 2) return;
  const left = new LinkedQueue();
  const right = new LinkedQueue();
  while (left.length < Math.floor(n / 2)) left.enqueue(list.dequeue());
  while (!list.isEmpty()) right.enqueue(list.dequeue());
  mergeSortLinked(left);
  mergeSortLinked(right);
  mergeLinked(left, right, list);
}

const mergeSortNonRec1 = (seq) => {
    const seqLength = seq.length;
    let _mergeCount = 0;
    let logN = 0;
    function merge(left, right) {
      _mergeCount += (left.length + right.length);
      if (_mergeCount === seqLength) {
        logN += 1;
        _mergeCount = 0;
      }
      const list = [];
      let [i, j] = [0, 0];
      while (i + j < left.length + right.length) {
        if (i < left.length && left[i] < right[j] || j === right.length) {
          list.push(left[i]);
          i++;
        } else {
          list.push(right[j]);
          j++;
        }
      }
      return list;
    }

    let mainStack = [];
    let secStack = [];
    while (seq.length) {
        mainStack.push([seq.pop()]);
    }

    while (mainStack.length) {
        if (mainStack.length === 1 && !secStack.length) {
          for (const el of mainStack[0]) seq.push(el);
          // console.log('logN', logN);
          return seq;
        }
        const left = mainStack.pop();
        const right = mainStack.length ? mainStack.pop() : [];
        secStack.push(merge(left, right));
        if (!mainStack.length) {
            [mainStack, secStack] = [secStack, mainStack];
        }
    }
}

const list = [4, 2, 8, 5, 1, 0];
mergeSort(list);
console.log(list);