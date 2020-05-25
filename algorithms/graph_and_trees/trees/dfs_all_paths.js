import { NodeBin, printTreeBin } from './tree_traversing.js';

function allPathsForASum(currentNode, sum, currentPath = [], allPaths = []) {
  if (currentNode === null) {
    return;
  }

  // add the current node to the path
  currentPath.push(currentNode.value);

  // if the current node is a leaf and its value is equal to sum, save the current path
  if (currentNode.value === sum && currentNode.left === null && currentNode.right === null) {
    allPaths.push([...currentPath]);
  } else {
    // traverse the left sub-tree
    allPathsForASum(currentNode.left, sum - currentNode.value, currentPath, allPaths);
    // traverse the right sub-tree
    allPathsForASum(currentNode.right, sum - currentNode.value, currentPath, allPaths);
  }
  // remove the current node from the path to backtrack,
  // we need to remove the current node while we are going up the recursive call stack.
  currentPath.pop();
  return allPaths;
}

function allRootToLeafPaths(currentNode, currentPath = [], allPaths = []) {
  if (currentNode === null) {
    return;
  }

  // add the current node to the path
  currentPath.push(currentNode.value);

  // if the current node is a leaf, save the current path
  if (currentNode.left === null && currentNode.right === null) {
    allPaths.push([...currentPath]);
  } else {
    // traverse the left sub-tree
    allRootToLeafPaths(currentNode.left, currentPath, allPaths);
    // traverse the right sub-tree
    allRootToLeafPaths(currentNode.right, currentPath, allPaths);
  }
  // remove the current node from the path to backtrack,
  // we need to remove the current node while we are going up the recursive call stack.
  currentPath.pop();
  return allPaths;
}

const rootBin = new NodeBin(1);
rootBin.left = new NodeBin(2);
rootBin.right = new NodeBin(3);
rootBin.left.left = new NodeBin(3);
rootBin.left.right = new NodeBin(3);


// console.log(printTreeBin(rootBin));
// console.log(allPathsForASum(rootBin, 6));
console.log(allRootToLeafPaths(rootBin));
