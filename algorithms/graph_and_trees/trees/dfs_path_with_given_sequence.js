
import { NodeBin } from './tree_traversing.js';

function pathWithGivenSequence(currentNode, sequence, sequenceIndex) {
  if (currentNode === null) {
    return false;
  }

  const seqLen = sequence.length;
  if (sequenceIndex >= seqLen || currentNode.value !== sequence[sequenceIndex]) {
    return false;
  }

  // if the current node is a leaf, add it is the end of the sequence, we have found a path!
  if (currentNode.left === null && currentNode.right === null && sequenceIndex === seqLen - 1) {
    return true;
  }

  // recursively call to traverse the left and right sub-tree
  // return true if any of the two recursive call return true
  return pathWithGivenSequence(currentNode.left, sequence, sequenceIndex + 1) ||
    pathWithGivenSequence(currentNode.right, sequence, sequenceIndex + 1);
}

const rootBin = new NodeBin(1);
rootBin.left = new NodeBin(2);
rootBin.right = new NodeBin(3);
rootBin.left.left = new NodeBin(3);
rootBin.left.right = new NodeBin(3);

console.log(pathWithGivenSequence(rootBin, [1, 2, 3], 0));
console.log(pathWithGivenSequence(rootBin, [1, 3, 2], 0));