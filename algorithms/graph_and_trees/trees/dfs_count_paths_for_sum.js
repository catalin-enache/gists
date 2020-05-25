
import { NodeBin, printTreeBin } from './tree_traversing.js';

function countPathsRecursive(currentNode, S, currentPath=[]) {
  if (currentNode === null) {
    return 0;
  }

  // add the current node to the path
  currentPath.push(currentNode.value);
  let pathCount = 0, pathSum = 0;
  // find the sums of all sub-paths in the current path list
  // the trick is we're iterating and adding from the end of currentPath
  for (let i = currentPath.length - 1; i >= 0; i--) {
    pathSum += currentPath[i];
    // if the sum of any sub-path is equal to 'S' we increment our path count.
    if (pathSum === S) {
      pathCount += 1;
    }
  }
  // traverse the left sub-tree
  pathCount += countPathsRecursive(currentNode.left, S, currentPath);
  // traverse the right sub-tree
  pathCount += countPathsRecursive(currentNode.right, S, currentPath);

  // remove the current node from the path to backtrack
  // we need to remove the current node while we are going up the recursive call stack
  currentPath.pop();
  return pathCount;
}


const root = new NodeBin(12);
root.left = new NodeBin(7);
root.right = new NodeBin(1);
root.left.left = new NodeBin(4);
root.left.left.left = new NodeBin(7);
root.right.left = new NodeBin(10);
root.right.right = new NodeBin(5);
printTreeBin(root);
console.log(`Tree has paths: ${countPathsRecursive(root, 11)}`);