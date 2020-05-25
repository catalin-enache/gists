'use strict';

// https://www.topcoder.com/community/competitive-programming/tutorials/introduction-to-string-searching-algorithms/

function findBoyerMoore(text, pattern) {
  // Return the lowest index of text at which substring pattern begins (or else -1).
  const [n, m] = [text.length, pattern.length]; // introduce convenient notations
  if (m === 0) return 0; // trivial search for empty string
  const last = {}; // build ’last’ dictionary

  for (let _ = 0; _ < m; _++) {
    last[pattern[_]] = _; // later occurrence overwrites
  }
  // align end of pattern at index m-1 of text
  let [i, k] = [m - 1, m - 1]; // an index into text and pattern

  while (i < n) {
    if (text[i] === pattern[k]) { // a matching character
      if (k === 0) { return i; } // pattern begins at index i of text
      else {
        i -= 1; k -= 1; // examine previous character of both text and pattern
      }
    } else {
      const _lastOccur = last[text[i]]; // last[text[i]] is -1 if not found
      let j = _lastOccur !== undefined ? _lastOccur : -1;

      if (j < k) {
        i += m - (j + 1); // advance the distance from j to end of pattern
      }
      else  {
        i += m - k; // advance the distance from k to end of pattern + 1
        // (will advance 1 relative to initial i) (cancels i decrements and adds 1)
      }
      // equivalent with
      // i += m - Math.min(k, j + 1); // case analysis for jump step

      k = m - 1; // restart at end of pattern
    }
  }

  return -1;
}

// alternate implementation
// https://www.geeksforgeeks.org/boyer-moore-algorithm-for-pattern-searching/
function findBoyerMoore2(text, pattern) {
  /// Return the lowest index of text at which substring pattern begins (or else -1).
  const [n, m] = [text.length, pattern.length]; // introduce convenient notations
  if (m === 0) return 0; // trivial search for empty string
  const last = {}; // build ’last’ dictionary

  for (let _ = 0; _ < m; _++) {
    last[pattern[_]] = _; // later occurrence overwrites
  }

  const indexes = [];

  // shift of the pattern with respect to text
  let shift = 0;
  while (shift <= n - m) {
    let k = m - 1;
    // Keep reducing index k of pattern while
    // characters of pattern and text are matching
    // at this shift
    while (k >= 0 && pattern[k] === text[shift + k]) {
      k -= 1;
    }

    // If the pattern is present at current shift,
    // then index k will become -1 after the above loop
    if (k < 0) {
      indexes.push(shift);
      // Shift the pattern so that the next character in text
      // aligns with the last occurrence of it in pattern.
      // The condition s+m < n is necessary for the case when
      // pattern occurs at the end of text
      if (shift + m < n) {
        const nextCharLastOcc = last[text[shift + m]] !== undefined ? last[text[shift + m]] : -1;
        shift += m - nextCharLastOcc;
      } else {
        shift += 1;
      }
    } else {
      // Shift the pattern so that the bad character in text
      // aligns with the last occurrence of it in pattern.
      // The max function is used to make sure that we get a positive shift.
      // We may get a negative shift if the last occurrence
      // of bad character in pattern is on the right side of the
      // current character.
      const lastBadCharOcc = last[text[shift + k]] !== undefined ? last[text[shift + k]] : -1;
      shift += Math.max(1, k - lastBadCharOcc);
    }

  }
  return indexes;
}



// console.log(findBoyerMoore('xxxbcbabcba', 'abcba'));
// console.log(findBoyerMoore2('xxxbcbabcba', 'abcba'));
// console.log(findBoyerMoore('accaccab', 'accab'));
// console.log(findBoyerMoore2('accaccab', 'accab'));
// console.log(findBoyerMoore('xcbaccbcbacbaccba', 'cbaccba'));
// console.log(findBoyerMoore2('xcbaccbcbacbaccba', 'cbaccba'));
// console.log(findBoyerMoore('abcdef', 'def'));
// console.log(findBoyerMoore2('abcdef', 'def'));
// console.log(findBoyerMoore('computer', 'muter'));
// console.log(findBoyerMoore2('computer', 'muter'));
// console.log(findBoyerMoore('stringmatchingmat', 'ingmat'));
// console.log(findBoyerMoore2('stringmatchingmat', 'ingmat'));
// console.log(findBoyerMoore('videobox', 'videobox'));
// console.log(findBoyerMoore2('videobox', 'videobox'));
// console.log(findBoyerMoore('atcamalgamamalgamatiolamalgamation', 'amalgamation'));
// console.log(findBoyerMoore2('atcamalgamamalgamatiolamalgamation', 'amalgamation'));





