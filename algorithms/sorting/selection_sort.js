// assigns at cursor position (i) the min value to the right
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const iVal = arr[i];
    let minVal = Infinity;
    let minIdx = -1;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < minVal) {
        minVal = arr[j];
        minIdx = j;
      }
    }

    if (minVal < iVal) {
      arr[i] = minVal;
      arr[minIdx] = iVal;
    }
  }
}

const list = [7, 3, 9, 0, 2, 1, 4, 5];
selectionSort(list);
console.log(list);