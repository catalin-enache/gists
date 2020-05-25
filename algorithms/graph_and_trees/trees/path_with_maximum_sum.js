import { NodeBin } from './tree_traversing.js';


class MaximumPathSum {
  findMaximumPathSum(root) {
    this.globalMaximumSum = -Infinity;
    this.findMaximumPathSumRecursive(root);
    return this.globalMaximumSum;
  }

  findMaximumPathSumRecursive(currentNode) {
    if (currentNode === null) {
      return 0;
    }

    let maxPathSumFromLeft = this.findMaximumPathSumRecursive(currentNode.left);
    let maxPathSumFromRight = this.findMaximumPathSumRecursive(currentNode.right);

    // ignore paths with negative sums, since we need to find the maximum sum we should
    // ignore any path which has an overall negative sum.
    maxPathSumFromLeft = Math.max(maxPathSumFromLeft, 0);
    maxPathSumFromRight = Math.max(maxPathSumFromRight, 0);

    // maximum path sum at the current node will be equal to the sum from the left subtree +
    // the sum from right subtree + value of current node
    const localMaximumSum = maxPathSumFromLeft + maxPathSumFromRight + currentNode.value;

    // update the global maximum sum
    this.globalMaximumSum = Math.max(this.globalMaximumSum, localMaximumSum);

    // maximum sum of any path from the current node will be equal to the maximum of
    // the sums from left or right subtrees plus the value of the current node
    return Math.max(maxPathSumFromLeft, maxPathSumFromRight) + currentNode.value;
  }
}


const maximumPathSum = new MaximumPathSum();
let root = new NodeBin(1);
root.left = new NodeBin(2);
root.right = new NodeBin(3);

console.log(`Maximum Path Sum: ${maximumPathSum.findMaximumPathSum(root)}`);
root.left.left = new NodeBin(1);
root.left.right = new NodeBin(3);
root.right.left = new NodeBin(5);
root.right.right = new NodeBin(6);
root.right.left.left = new NodeBin(7);
root.right.left.right = new NodeBin(8);
root.right.right.left = new NodeBin(9);
console.log(`Maximum Path Sum: ${maximumPathSum.findMaximumPathSum(root)}`);

root = new NodeBin(-1);
root.left = new NodeBin(-3);
console.log(`Maximum Path Sum: ${maximumPathSum.findMaximumPathSum(root)}`);