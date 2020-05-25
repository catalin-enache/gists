
function canPartitionRecursiveBasic(set, sum, currentIndex) {
  // base check
  if (sum === 0) return true;

  if (set.length === 0 || currentIndex >= set.length) return false;

  // recursive call after choosing the number at the currentIndex
  // if the number at currentIndex exceeds the sum, we shouldn't process this
  if (set[currentIndex] <= sum) {
    if (canPartitionRecursiveBasic(set, sum - set[currentIndex], currentIndex + 1)) return true;
  }

  // recursive call after excluding the number at the currentIndex
  return canPartitionRecursiveBasic(set, sum, currentIndex + 1);
}


function canPartitionRecursiveBasicWithDP(set, sum, currentIndex, dp = []) {
  // base check
  if (sum === 0) return true;

  if (set.length === 0 || currentIndex >= set.length) return false;

  dp[currentIndex] = dp[currentIndex] || [];
  if (typeof dp[currentIndex][sum] !== 'undefined') return dp[currentIndex][sum];
  // if we have not already processed a similar problem
  // recursive call after choosing the number at the currentIndex
  // if the number at currentIndex exceeds the sum, we shouldn't process this
  if (set[currentIndex] <= sum) {
    if (canPartitionRecursiveBasicWithDP(set, sum - set[currentIndex], currentIndex + 1, dp)) {
      dp[currentIndex][sum] = true;
      return true;
    }
  }
  // recursive call after excluding the number at the currentIndex
  dp[currentIndex][sum] = canPartitionRecursiveBasicWithDP(set, sum, currentIndex + 1, dp);

  return dp[currentIndex][sum];
}


function canPartitionRec(set, iSum, sum, idx, taken = [], results = []) {
  if (idx < -1) {
    return false;
  }

  if (sum === 0) {
    results.push([...taken]);
    while (taken.length) {
      const idxToRemove = set.indexOf(taken.pop());
      set = set.slice(0, idxToRemove).concat(set.slice(idxToRemove + 1));
    }
    taken = [];
    sum = iSum;
    idx = set.length - 1;
    if (set.length === 0) return true;
    return canPartitionRec(set, iSum, sum, idx, taken, results);
  }

  const currVal = set[idx];

  if (currVal <= sum) {
    if (canPartitionRec(set, iSum, sum - currVal, idx - 1, taken.push(currVal) && taken, results)) {
      return results;
    }
    taken.pop();
  }

  return canPartitionRec(set, iSum, sum, idx - 1, taken, results);
}

const set = [1, 3, 3, 5, 6, 0];  // [1, 1, 3, 4, 7] true | [1, 2, 3, 4] true | [2, 3, 4, 6] false | [1, 3, 3, 5, 6, 0]
const targetSum = set.reduce((acc, num) => acc + num, 0) / 2;
// const res = canPartitionRec(set, targetSum, targetSum, set.length - 1);
const res = canPartitionRecursiveBasicWithDP(set, targetSum, 0);

console.log({ res, targetSum });
