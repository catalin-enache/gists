import { Graph } from './graph.js';

export function bfsQ(graph, start, discovered = new Map([[start, null]])) {
  const queue = [start];
  while (queue.length) {
    const vertex = queue.shift();
    graph.getIncidentEdges(vertex).forEach((edge) => {
      const next = edge.opposite(vertex);
      if (!discovered.get(next)) {
        discovered.set(next, edge);
        queue.push(next);
      }
    });
  }
  return discovered;
}

export function bfs(graph, start, discovered = new Map([[start, null]])) {
  let level = [start];
  while (level.length) {
    const nextLevel = [];
    for (let vertex of level) {
      graph.getIncidentEdges(vertex).forEach((edge) => {
        const next = edge.opposite(vertex);
        if (!discovered.get(next)) {
          discovered.set(next, edge);
          nextLevel.push(next);
        }
      });
    }
    level = nextLevel;
  }
  return discovered;
}

export function dfs(graph, start, discovered = new Map([[start, null]])) {
  graph.getIncidentEdges(start).forEach((edge) => {
    const next = edge.opposite(start);
    if (!discovered.get(next)) {
      discovered.set(next, edge);
      dfs(graph, next, discovered);
    }
  });
  return discovered;
}

/*
The DFS complete function can be used to analyze the connected components of an undirected graph.
The number of connected components can be determined by the number of vertices in the discovery dictionary
that have null as their discovery edge (those are roots of DFS trees).
*/

export function dfsComplete(graph) {
  const forest = new Map();
  graph.vertices.forEach((vertex) => {
    if (!forest.get(vertex)) {
      forest.set(vertex, null);
      dfs(graph, vertex, forest);
    }
  });
  return forest;
}

export function constructPath(u, v, discovered) {
  const path = [];
  if (discovered.get(v)) {
    path.push(v);
    let walk = v;
    let edge = null;
    let parent = null;
    while (walk !== u) {
      edge = discovered.get(walk);
      parent = edge.opposite(walk);
      path.push(parent);
      walk = parent;
    }
  }
  return path.reverse();
}

/*
To check if a directed graph is strongly connected run 2 dfs (from random vertex).
One through outgoing edges (if at least 1 node is not reached then the graph is not strongly connected).
The second one through incoming edges (if at least 1 node is not reached then the graph is not strongly connected).
*/
