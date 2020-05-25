import { Subset, find, union } from './union_find.js';

// https://www.geeksforgeeks.org/union-find-algorithm-set-2-union-by-rank/

class Graph {
  constructor(props) {
    this.edges = {};
    this.vertices = new Set();
  }

  addEdge(u, v){
    this.edges[u] ? (this.edges[u].push(v)) : (this.edges[u] = [v]);
    this.vertices.add(u);
    this.vertices.add(v);
  }
}

function isCycle(graph) {
  const subsets = [];
  for (const u of graph.vertices) {
    subsets.push(new Subset(u, 0));
  }
  for (const u of Object.keys(graph.edges)) {
    const uRep = find(subsets, u);
    for (const v of graph.edges[u]) {
      const vRep = find(subsets, v);
      if (uRep === vRep) {
        return true;
      }
      union(subsets, uRep, vRep);
    }
  }
  return false;
}

const g = new Graph();
g.addEdge(0, 1);
g.addEdge(1, 2);
g.addEdge(0, 2);

console.log(isCycle(g));
