import { Subset, union, find } from '../../union_find/union_find.js';

// https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/

class Graph {
  constructor(){
    this.edges = [];
    this.vertices = new Set();
  }

  addEdge(u, v, w) {
    this.edges.push([u, v, w]);
    this.vertices.add(u);
    this.vertices.add(v);
  }
}

function kruskal(graph) {
  // Initialize minimum spanning tree.
  const MST = [];
  const forest = [];

  // Sort edges in non-decreasing w order.
  graph.edges.sort(([u1, v1, w1], [u2, v2, w2]) => w1 - w2);

  // Make each vertex its own subset
  // and add it to the forest.
  for (const v of graph.vertices) {
    forest.push(new Subset(v, 0));
  }

  // For each edge in increasing w order.
  for (const [u, v, w] of graph.edges) {
    // If including this edge does't cause cycle,
    // (vertices of the edge are not in the same group)
    if (find(forest, u) !== find(forest, v)) {
      // include it in result
      MST.push([u, v, w]);
      // and do an union.
      union(forest, u, v)
    }
  }

  return MST;
}


/*
         --------->3<--------
        |          /\        |
        |        5 |     10  | 15
      4 |          0   ----> 1
        |        6 |
        |          \/
         --------- 2

*/


const g = new Graph();
g.addEdge(0, 1, 10);
g.addEdge(0, 2, 6);
g.addEdge(0, 3, 5);
g.addEdge(1, 3, 15);
g.addEdge(2, 3, 4);

console.log(kruskal(g)); // [ [ 2, 3, 4 ], [ 0, 3, 5 ], [ 0, 1, 10 ] ]