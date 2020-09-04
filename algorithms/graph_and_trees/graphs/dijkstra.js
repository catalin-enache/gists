
import { Graph } from './graph.js';

function getNext(pq, dist) {
  pq.sort((a, b) => dist.get(b) - dist.get(a));
  return pq.pop();
}

function dijkstra(graph, s) {
  const dist = new Map();
  const pq = [];

  for (const v of graph.vertices) {
    if (v === s) {
      dist.set(v, 0)
    } else {
      dist.set(v, Infinity)
    }
    pq.push(v);
  }

  while (pq.length) {
    const u = getNext(pq, dist);
    // relaxation
    for (const [v, edge] of graph.getIncidentEdges(u).entries()) {
      if (dist.get(u) + edge.value < dist.get(v)) {
        dist.set(v, dist.get(u) + edge.value);
      }
    }
  }

  return dist;
}

function reconstructPath(graph, s, dist) {
  const tree = new Map();
  for (const [v, dst] of dist.entries()) {
    // if (v === s) continue; // ???
    for (const [u, incomingEdge] of graph.getIncidentEdges(v, false)) {
      const wgt = incomingEdge.value;
      if (dst === dist.get(u) + wgt) {
        tree.set(v, u);
        // tree.set(v, incomingEdge);
      }
    }
  }
  return tree;
}


let graph = new Graph(true);
let [v1, v2, v3, v4, v5, v6] = [1, 2, 3, 4, 5, 6].map(graph.addVertex.bind(graph));
[
  [v1, v2, 2],
  [v1, v3, 4],
  [v2, v3, 1],
  [v2, v4, 7],
  [v3, v5, 3],
  [v5, v4, 2],
  [v5, v6, 5],
  [v4, v6, 1]
].forEach((entry) => graph.addEdge(...entry));

let dist = dijkstra(graph, v1);
console.log('dist', dist);
console.log('path', reconstructPath(graph, v1, dist));

graph = new Graph(true);
[v1, v2, v3, v4, v5, v6] = [1, 2, 3, 4, 5, 6].map(graph.addVertex.bind(graph));
[
  [v1, v4, 10],
  [v4, v1, 10],
  [v1, v3, 45],
  [v1, v2, 50],
  [v2, v4, 15],
  [v4, v5, 15],
  [v5, v2, 20],
  [v2, v3, 10],
  [v3, v5, 30],
  [v5, v3, 35],
  [v6, v5, 3],

].forEach((entry) => graph.addEdge(...entry));


dist = dijkstra(graph, v1);
console.log('dist', dist);
console.log('path', reconstructPath(graph, v1, dist));


