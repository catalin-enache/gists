'use strict';

// https://www.topcoder.com/community/competitive-programming/tutorials/introduction-to-string-searching-algorithms/


// https://www.youtube.com/watch?v=V5-7GzOfADQ  9.1 Knuth-Morris-Pratt KMP String Matching Algorithm
function findKMP(text, patt) {
  // Return the lowest index of text at which substring patt begins (or else -1).
  let [n, m] = [text.length, patt.length]; // introduce convenient notations
  if (m === 0) return 0; // trivial search for empty string
  const fail = computeKMPFail(patt); // rely on utility to precompute
  console.log('fail', fail);
  let j = 0; // index to text
  let k = 0; // index to patt

  while (j < n) {
    console.log('j', j);
    if (text[j] === patt[k]) { // patt[0:1+k] matched thus far
      console.log('matched', text[j], patt[k]);
      if (k === m - 1) { // match is complete
        console.log('match complete', j - m + 1);
        return j - m + 1;
      }
      j += 1; // try to extend match
      k += 1;
    } else if (k > 0) {
      // something matched so far
      console.log('fail', text[j], patt[k], 'making k', k, '=>', fail[k - 1]);
      k = fail[k - 1]; // reuse prefix of patt[0:k] (if any) // align text suffix with patt prefix
      console.log('reusing', patt.slice(0, k) || '""');
    } else {
      // if nothing to align just increase text cursor
      j += 1;
    }
  }
  return -1; // reached end without match
}

function computeKMPFail(patt) {
  const m = patt.length;
  const fail = Array(m).fill(0);
  let [j, k] = [1, 0];
  while (j < m) {
    if (patt[j] === patt[k]) {
      fail[j] = k + 1;
      j += 1;
      k += 1;
    } else if (k > 0) {
      k = fail[k - 1];
    } else {
      j += 1;
    }
  }
  return fail;
}


// https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/
function findKMP2(text, patt) {
  const n = text.length;
  const m = patt.length;
  // create lps[] that will hold the longest prefix suffix
  // values for pattern
  const lps = computeKMPFail2(patt);
  let i = 0; // index for txt[]
  let j = 0; // index for pat[]

  while (i < n) {
    if (patt[j] === text[i]) {
      i += 1;
      j += 1;
      if (j === m) {
        return i - j;
      }
    } else if (j > 0) {
      j = lps[j-1];
    } else {
      i += 1;
    }
  }

}

// computeLPSArray
function computeKMPFail2(patt) {
  const m = patt.length;
  const lps = Array(m).fill(0);
  let len = 0; // length of the previous longest prefix suffix
  // lps[0] is always 0
  let i = 1;
  // the loop calculates lps[i] for i = 1 to M-1
  while(i < m) {
    if (patt[i] === patt[len]) {
      len += 1;
      lps[i] = len;
      i += 1;
    } else {
      // This is tricky. Consider the example.
      // AAACAAAA and i = 7. The idea is similar
      // to search step.
      if (len !== 0) {
        len = lps[len-1];
      } else {
        i += 1;
      }
    }
  }
  return lps;
}

// console.log(computeKMPFail( 'ccbaccbaccc'));

// console.log(computeKMPFail('abcabdbabda'));
// console.log(computeKMPFail( 'ccbaccbaccc'));
// console.log(computeKMPFail( 'ccccc'));
// console.log(computeKMPFail('accab'));
// console.log(computeKMPFail('baccba'));
// console.log(computeKMPFail('ccbaccba'));
// console.log(computeKMPFail('abcabd'));


// console.log(findKMP('accaccab', 'accab'));
// console.log(findKMP2('accaccab', 'accab'));
// console.log(findKMP('xcbaccbcbacbaccba', 'cbaccba'));
// console.log(findKMP2('xcbaccbcbacbaccba', 'cbaccba'));
// console.log(findKMP('abcdef', 'def'));
// console.log(findKMP2('abcdef', 'def'));
// console.log(findKMP('computer', 'muter'));
// console.log(findKMP('stringmatchingmat', 'ingmat'));
// console.log(findKMP2('stringmatchingmat', 'ingmat'));
// console.log(findKMP('videobox', 'videobox'));
// console.log(findKMP('atcamalgamamalgamatiolamalgamation', 'amalgamation'));
// console.log(findKMP2('atcamalgamamalgamatiolamalgamation', 'amalgamation'));




