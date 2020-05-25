// https://stackoverflow.com/questions/14368392/radix-sort-vs-counting-sort-vs-bucket-sort-whats-the-difference
// https://brilliant.org/wiki/radix-sort/
// https://www.geeksforgeeks.org/radix-sort/

function log(num, base){
  return Math.log(num) / Math.log(base);
}

function countingSort(A, digit, radix) {
  // "A" is a list to be sorted, radix is the base of the number system,
  // digit is the digit we want to sort by

  // create a list B which will be the sorted list
  const B = Array.from({ length: A.length }).map(() => 0);
  const C = Array.from({ length: radix }).map(() => 0);

  // counts the number of occurrences of each digit in A
  for (let i = 0; i < A.length; i++) {
    const digitOfAi = Math.floor((A[i] / (radix ** digit)) % radix);
    C[digitOfAi] += 1;
  }

  // this FOR loop changes C to show the cumulative # of digits up to that index of C
  for (let j = 1; j < radix; j++) {
    C[j] = C[j] + C[j - 1];
  }

  for (let m = A.length - 1; m >= 0; m--) { // #to count down (go through A backwards)
    const digitOfAi = Math.floor((A[m] / (radix ** digit)) % radix);
    C[digitOfAi] -= 1;
    B[C[digitOfAi]] = A[m];
  }

  return B;
}

function radixSort(A, radix) {
  // radix is the base of the number system
  // k is the largest number in the list
  const k = Math.max(...A);
  // output is the result list we will build
  let output = A;
  // compute the number of digits needed to represent k
  // Math.ceil(log(k, radix)) || Math.floor(log(k, radix) + 1)
  const digits = Math.ceil(log(k, radix));
  for (let digit = 0; digit < digits; digit++) {
    output = countingSort(output, digit, radix);
  }

  return output;
}

const list = [111, 321, 332, 89, 3245, 45, 2, 7];
const sorted = radixSort(list, 10);
console.log(sorted);
