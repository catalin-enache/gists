import {
  treeBuilder,
  afterBin,
  beforeBin,
  bfs, bfs2, bfsBin, bfsBin2, buildExpressionTree,
  depth, depthBin, depth2, eulerTour, evaluateExpressionTree,
  find, findWithPath, findIter, findIterWithPath, findBin, findBinIter, findBinWithPath, findBinIterWithPath,
  printTree, printTreeBin,
  subtreeSearchBin, findGEBin, findLEBin, findRange, insertBin, deleteBin,
  firstBin,
  height, heightBin, inorder, lastBin, lowestCommonAncestor, lowestCommonAncestorBin,
  Node,
  NodeBin, postorder, postorderBin, postorderIter, postorderBinIter,
  preorder, preorderIter, preorderBin, preorderBinIter
} from "./tree_traversing.js";

const treeOne = {
    'value': 1, 'children': [
        {'value': 2, 'children': [
            {'value': 5, 'children': []},
            {'value': 6, 'children': []},
            {'value': 7, 'children': []},
        ]},
        {'value': 3, 'children': [
            {'value': 8, 'children': []},
            {'value': 9, 'children': []},
            {'value': 10, 'children': []},
        ]},
        {'value': 4, 'children': [
            {'value': 11, 'children': []},
            {'value': 12, 'children': []},
            {'value': 13, 'children': []},
        ]},
    ]
};

const binTreeOne = {
  value: 10,
  left: {
    value: 5,
    left: {
      value: 3,
      left: {},
      right: {}
    },
    right: {
      value: 8,
      left: {
        value: 6,
        left: {},
        right: {}
      },
      right: {}
    }
  },
  right: {
    value: 15,
    left: {
      value: 13,
      left: {},
      right: {}
    },
    right: {
      value: 20,
      left: {},
      right: {}
    }
  },
};

const root = treeBuilder(treeOne);
const rootBin = treeBuilder(binTreeOne, true);

// printTree(root);
// printTreeBin(rootBin);

// console.log(depth(root, 7));
// console.log(depth2(find(root, 7)));
// console.log(height(root));
// console.log(find(root, 7));
// console.log(findIter(root, 7));
// console.log(findWithPath(root, 7).map((node) => node.value));
// console.log(findIterWithPath(root, 7).map((node) => node.value));
// console.log([...bfs(root)]);
// console.log(bfs2(root));
// console.log([...preorder(root)]);
// console.log([...preorderIter(root)]);
// console.log([...postorder(root)]);
// console.log([...postorderIter(root)]);
// console.log(eulerTour(root, (node, depth, path) => {
//   // console.log('    '.repeat(depth), node.value);
//   console.log('pre', node.value, ' => ', path.map((node) => node.value).join(', '));
// }, (node, depth, path, results) => {
//   return [node.value].concat(results).reduce((acc, num) => acc + num);
// }));
// console.log(lowestCommonAncestor(root, 6, 7));
// console.log(root.toString());

// console.log(findBin(rootBin, 5).value);
// console.log(findBinIter(rootBin, 5).value);
// console.log(findBinWithPath(rootBin, 8).map((node) => node.value)); // [8, 5, 10]
// console.log(findBinIterWithPath(rootBin, 8).map((node) => node.value)); // [8, 5, 10]
// console.log(depthBin(rootBin, 8));
// console.log(heightBin(rootBin));
// console.log(subtreeSearchBin(rootBin, 4).value); // 3
// console.log(subtreeSearchBin(rootBin, 6).value); // 8
// console.log(findGEBin(rootBin, 4).value); // 5
// console.log(findLEBin(rootBin, 4).value); // 3
// console.log(findRange(rootBin, 5, 11).map((node) => node.value)); // 5, 8, 10
// console.log([...bfsBin(rootBin)]);
// console.log([...bfsBin2(rootBin, false)].map((level) => level.map((n) => n.value)));
// console.log([...preorderBin(rootBin)]);
// console.log([...preorderBinIter(rootBin)]);
// console.log([...postorderBin(rootBin)]);
// console.log([...postorderBinIter(rootBin)]);
// console.log([...inorder(rootBin)]);
// console.log(lowestCommonAncestorBin(rootBin, 3, 13).value);
// console.log(evaluateExpressionTree(buildExpressionTree('(((3+1)*4)/((9-3)+2))')));
// console.log(firstBin(rootBin).value);
// console.log(lastBin(rootBin).value);
// console.log(beforeBin(findBin(rootBin, 10)).value);
// console.log(beforeBin(findBin(rootBin, 20)).value);
// console.log(afterBin(findBin(rootBin, 10)).value);
// console.log(afterBin(findBin(rootBin, 8)).value);
// var node = insertBin(rootBin, 14);
// console.log(node.parent); // 13
// console.log(deleteBin(rootBin, 10));
// printTreeBin(rootBin);
// console.dir(rootBin, { depth: null });
// console.log(rootBin.toString());