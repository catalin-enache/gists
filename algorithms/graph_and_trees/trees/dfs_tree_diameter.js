import { NodeBin  } from './tree_traversing.js';


class TreeDiameter {
  constructor() {
    this.treeDiameter = 0;
  }

  findDiameter(root) {
    this.calculateHeight(root);
    return this.treeDiameter;
  }

  calculateHeight(currentNode) {
    if (currentNode === null) {
      return 0;
    }

    const leftTreeHeight = this.calculateHeight(currentNode.left);
    const rightTreeHeight = this.calculateHeight(currentNode.right);

    // diameter at the current node will be equal to the height of left subtree +
    // the height of right sub-trees + '1' for the current node
    const diameter = leftTreeHeight + rightTreeHeight + 1;

    // update the global tree diameter
    this.treeDiameter = Math.max(this.treeDiameter, diameter);

    // height of the current node will be equal to the maximum of the hights of
    // left or right subtrees plus '1' for(the current node
    return Math.max(leftTreeHeight, rightTreeHeight) + 1;
  }
}


const treeDiameter = new TreeDiameter();
const root = new NodeBin(1);
root.left = new NodeBin(2);
root.right = new NodeBin(3);
root.left.left = new NodeBin(4);
root.right.left = new NodeBin(5);
root.right.right = new NodeBin(6);
console.log(`Tree Diameter: ${treeDiameter.findDiameter(root)}`);
root.left.left = null;
root.right.left.left = new NodeBin(7);
root.right.left.right = new NodeBin(8);
root.right.right.left = new NodeBin(9);
root.right.left.right.left = new NodeBin(10);
root.right.right.left.left = new NodeBin(11);
console.log(`Tree Diameter: ${treeDiameter.findDiameter(root)}`);
