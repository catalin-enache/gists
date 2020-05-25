
// https://www.geeksforgeeks.org/traveling-salesman-problem-tsp-implementation/
// https://www.youtube.com/watch?v=quAS1iydq7U
// https://www.youtube.com/watch?v=zGQq3HGBTXg
// https://github.com/bephrem1/backtobackswe/blob/3b21637af6f9be6d1d32dcef94c8a3c04d74cefa/Arrays%2C%20Primitives%2C%20Strings/NextPermutation/NextPermutation.java

function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}


// Reverses from 'start' to the end of the array 'nums'
function reverse(nums, start) {
  let left = start;
  let right = nums.length - 1;

  while (left < right) {
    swap(nums, left, right);
    left++;
    right--;
  }
}

function nextPermutation(nums, startOver = false) {

  // Grab the index of the 2nd to last element in the array
  let i = nums.length - 2;

  // Walk backwards. Keep walking until we reach the point right
  // before the decreasing sequence begins. When this while loop
  // ends that is where i will stand
  while (i >= 0 && nums[i + 1] <= nums[i]) {
    i--;
  }

  // If i IS the first element we're at the last permutation
  if (i < 0 && !startOver) return false;

  // If i is not the first element we have more work to do
  // If i IS the first element we just skip down to reverse
  // the whole array since the WHOLE array would be decreasing
  // meaning we are on our last permutation
  if (i >= 0) {
    // Start a pointer at the end of the array, we want to search for
    // the smallest item THAT IS GREATER THAN THE ELEMENT AT i
    // Why? Why Why Why. The reason why is that we want to know the
    // NEXT element that is to be planted where i is sitting. THIS
    // WILL ROOT THE NEXT PERMUTATION and represents the smallest change
    // we can make thus ensuring we have exactly the next permutation
    let j = nums.length - 1;
    while (j >= 0 && nums[j] <= nums[i]) {
      j--;
    }
    // We swap those elements.
    // Now all that is left is to reverse the decreasing section (it
    // is already sorted in reverse order) to restore it to the first
    // positionality it would be with the new value rooted at i
    swap(nums, i, j);
  }
  // Perform the reversal on the decreasing section now. We pass in i + 1
  // since i sits RIGHT BEFORE the decreasing section that is on its final
  // permutation
  reverse(nums, i + 1);
}

// const list = [1,3,2];
// nextPermutation(list, false);
// console.log(list); // 2,1,3