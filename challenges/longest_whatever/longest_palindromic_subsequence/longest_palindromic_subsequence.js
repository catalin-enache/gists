
// Longest palindromic sub-sequence is the same as
// longest common sub-sequence between a sequence and its reverse
// so the LCS (longest common sub-sequence) algorithm can be used.

// https://www.geeksforgeeks.org/longest-palindromic-subsequence-dp-12/
// recursive approach
function lpsRec(str) {
  if (str.length === 0) return 0;
  if (str.length === 1) return 1;

  const [first, last] = [str[0], str[str.length - 1]];

  if (first === last && str.length === 2) return 2;
  if (first === last) return 2 + lpsRec(str.slice(1, -1));

  return Math.max(
    lpsRec(str.slice(1)), lpsRec(str.slice(0, -1))
  );
}

console.log(lpsRec('ABBDCACB')); // 5 ABBDCACB | BCACDBBA => BCACB

