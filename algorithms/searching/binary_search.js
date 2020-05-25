function binarySearchRec(list, needle, low = 0, high = list.length - 1) {
  if (low > high) return -1;
  const mid = Math.floor((low + high) / 2);
  if (list[mid] === needle) return mid;
  if (needle > list[mid]) return binarySearchRec(list, needle, mid + 1, high);
  return binarySearchRec(list, needle, low, mid - 1);
}

function binarySearchIter(list, needle) {
  let low = 0;
  let high = list.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (list[mid] === needle) return mid;
    if (needle > list[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}

console.log(binarySearchRec([1, 3, 4, 6, 7, 9, 12], 12));
console.log(binarySearchIter([1, 3, 4, 6, 7, 9, 12], 12));