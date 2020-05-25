
import { Graph } from './graph.js';

function getNext(graph, u, dist) {
  return [...graph.getIncidentEdges(u).keys()].sort(
    (v1, v2) => dist.get(v1) - dist.get(v2)
  )[0];
}

function *dijkstra(
  graph, u,
  dist = new Map(graph.vertices.map((v) => [v, v === u ? 0 : Number.POSITIVE_INFINITY]))
) {
  yield u;

  // relaxation
  for (const [v, edge] of graph.getIncidentEdges(u).entries()) {
    if (dist.get(u) + edge.value < dist.get(v)) {
      dist.set(v, dist.get(u) + edge.value);
    }
  }

  // get min from "priority queue"
  let next = getNext(graph, u, dist);

  if (next) {
    yield *dijkstra(graph, next, dist);
  }
}

function getNextVertAdjMat(graph, u, dist) {
  let min = Number.POSITIVE_INFINITY;
  let idx = null;
  for (const [v, d] of graph[u].entries()) {
    // If d then means we have an outgoing edge.
    if (d && dist[v] < min) {
      min = d;
      idx = v;
    }
  }
  return idx;
}

function *dijkstraAdjMat(graph, u, dist = graph[u].reduce((acc, _, v) => {
  acc[v] = (v === u ? 0 : Number.POSITIVE_INFINITY);
  return acc;
}, {})) {
  yield u;
  // relaxation
  for (const [v, d] of graph[u].entries()) {
    // If d then means we have an outgoing edge.
    if (d && dist[v] > dist[u] + d) {
      dist[v] = dist[u] + d;
    }
  }
  const next = getNextVertAdjMat(graph, u, dist);
  if (next) {
    yield *dijkstraAdjMat(graph, next, dist);
  }
}

var graph = new Graph(true);
var [v1, v2, v3, v4, v5, v6] = [1, 2, 3, 4, 5, 6].map(graph.addVertex.bind(graph));
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

console.log([...dijkstra(graph, v1)].map((v) => v.value));

var graph = [
  [0,  2,  4,  0,  0,  0],
  [0,  0,  1,  7,  0,  0],
  [0,  0,  0,  0,  3,  0],
  [0,  0,  0,  0,  0,  1],
  [0,  0,  0,  2,  0,  5],
  [0,  0,  0,  0,  0,  0],
];

console.log([...dijkstraAdjMat(graph, 0)]);

